import { formatFiles, logger, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import { DomainGeneratorSchema } from './schema';
import { deleteDir, setAppPrefixInEslint, toPascalCase } from '../../utils/naming';

function upperSnake(name: string): string {
  return name.replace(/-/g, '_').toUpperCase();
}

export async function domainGenerator(
  tree: Tree,
  options: DomainGeneratorSchema,
) {
  const { name, mfe } = options;
  const firstFeature = options.firstFeature ?? 'overview';
  const domainRoot = `libs/domain/${name}`;

  if (tree.exists(domainRoot)) {
    throw new Error(`${domainRoot} already exists`);
  }

  const makeLib = async (folder: string, type: string) => {
    const projectName = `domain-${name}-${folder}`;
    await libraryGenerator(tree, {
      directory: `${domainRoot}/${folder}`,
      name: projectName,
      importPath: `@monorepo-test/domain/${name}/${folder}`,
      tags: `scope:${name},mfe:${mfe},type:${type}`,
      style: 'scss',
      standalone: true,
      skipFormat: true,
    });
    return projectName;
  };

  const shellProject = await makeLib('shell', 'shell');
  const featureProject = await makeLib(`feature-${firstFeature}`, 'feature');
  await makeLib('data-access', 'data-access');
  await makeLib('ui', 'ui');
  await makeLib('model', 'model');

  // First feature: replace placeholder with a real page component
  const featureRoot = `${domainRoot}/feature-${firstFeature}`;
  deleteDir(tree, `${featureRoot}/src/lib/${featureProject}`);

  const featureClass = toPascalCase(firstFeature);
  tree.write(
    `${featureRoot}/src/lib/${firstFeature}.ts`,
    `import { Component } from '@angular/core';

@Component({
  selector: 'app-${firstFeature}',
  standalone: true,
  template: \`
    <section class="page">
      <h2>${toPascalCase(name)} — ${featureClass}</h2>
      <p>Platzhalter für ${featureClass}.</p>
    </section>
  \`,
  styles: [
    \`
      .page {
        padding: 1.5rem;
        font-family: system-ui, sans-serif;
      }
      h2 {
        margin-top: 0;
      }
    \`,
  ],
})
export class ${featureClass} {}
`,
  );
  tree.write(
    `${featureRoot}/src/index.ts`,
    `export { ${featureClass} } from './lib/${firstFeature}';\n`,
  );
  setAppPrefixInEslint(tree, featureRoot);

  // Shell: replace placeholder with routes composition
  const shellRoot = `${domainRoot}/shell`;
  deleteDir(tree, `${shellRoot}/src/lib/${shellProject}`);

  const NAME_UP = upperSnake(name);
  tree.write(
    `${shellRoot}/src/lib/${name}.routes.ts`,
    `import { Route } from '@angular/router';
import { ${featureClass} } from '@monorepo-test/domain/${name}/feature-${firstFeature}';

export const ${NAME_UP}_ROUTES: Route[] = [
  { path: '', component: ${featureClass} },
];
`,
  );
  tree.write(
    `${shellRoot}/src/index.ts`,
    `export { ${NAME_UP}_ROUTES } from './lib/${name}.routes';\n`,
  );
  setAppPrefixInEslint(tree, shellRoot);

  await formatFiles(tree);

  logger.info(`✓ Created domain "${name}" under libs/domain/${name}/`);
  logger.info(
    `  Libs: shell, feature-${firstFeature}, data-access, ui, model (all tagged mfe:${mfe}, scope:${name})`,
  );
  logger.info(
    `  Shell exports ${NAME_UP}_ROUTES via @monorepo-test/domain/${name}/shell`,
  );
  logger.info(
    `  Next: in your ${mfe} app, import and re-export ${NAME_UP}_ROUTES so the shell federation can mount it.`,
  );
}

export default domainGenerator;
