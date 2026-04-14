import { formatFiles, logger, Tree } from '@nx/devkit';
import { libraryGenerator } from '@nx/angular/generators';
import { FeatureGeneratorSchema } from './schema';
import { deleteDir, setAppPrefixInEslint, toPascalCase } from '../../utils/naming';

function detectMfeTag(tree: Tree, domain: string): string {
  const candidates = [
    `libs/domain/${domain}/shell`,
    `libs/domain/${domain}/data-access`,
    `libs/domain/${domain}/model`,
    `libs/domain/${domain}/ui`,
  ];
  for (const root of candidates) {
    const pj = `${root}/project.json`;
    if (tree.exists(pj)) {
      const cfg = JSON.parse(tree.read(pj, 'utf-8')!);
      const mfeTag = (cfg.tags ?? []).find((t: string) => t.startsWith('mfe:'));
      if (mfeTag) return mfeTag.substring(4);
    }
  }
  throw new Error(
    `Could not detect mfe tag for domain "${domain}". ` +
      `Expected at least one lib under libs/domain/${domain}/ with a "mfe:*" tag.`,
  );
}

export async function featureGenerator(
  tree: Tree,
  options: FeatureGeneratorSchema,
) {
  const { name, domain } = options;
  const projectName = `domain-${domain}-feature-${name}`;
  const projectRoot = `libs/domain/${domain}/feature-${name}`;

  if (tree.exists(projectRoot)) {
    throw new Error(`${projectRoot} already exists`);
  }

  const mfe = detectMfeTag(tree, domain);

  await libraryGenerator(tree, {
    directory: projectRoot,
    name: projectName,
    importPath: `@monorepo-test/domain/${domain}/feature-${name}`,
    tags: `scope:${domain},mfe:${mfe},type:feature`,
    style: 'scss',
    standalone: true,
    skipFormat: true,
  });

  // Remove the scaffolded placeholder component directory
  deleteDir(tree, `${projectRoot}/src/lib/${projectName}`);

  // Write our own minimal page component
  const className = toPascalCase(name);
  tree.write(
    `${projectRoot}/src/lib/${name}.ts`,
    `import { Component } from '@angular/core';

@Component({
  selector: 'app-${name}',
  standalone: true,
  template: \`
    <section class="page">
      <h2>${className}</h2>
      <p>Platzhalter für ${className}.</p>
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
export class ${className} {}
`,
  );

  tree.write(
    `${projectRoot}/src/index.ts`,
    `export { ${className} } from './lib/${name}';\n`,
  );

  setAppPrefixInEslint(tree, projectRoot);

  await formatFiles(tree);

  logger.info(
    `✓ Created feature lib "${projectName}" (tags: scope:${domain}, mfe:${mfe}, type:feature)`,
  );
  logger.info(
    `  Import via: @monorepo-test/domain/${domain}/feature-${name}`,
  );
  logger.info(
    `  Hint: wire into libs/domain/${domain}/shell routes if you want it routable.`,
  );
}

export default featureGenerator;
