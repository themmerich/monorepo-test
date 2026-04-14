import { formatFiles, GeneratorCallback, logger, Tree } from '@nx/devkit';
import { applicationGenerator } from '@nx/angular/generators';
import { execSync } from 'child_process';
import { MfeGeneratorSchema } from './schema';
import { toPascalCase } from '../../utils/naming';

export async function mfeGenerator(
  tree: Tree,
  options: MfeGeneratorSchema,
): Promise<GeneratorCallback> {
  const { name, port } = options;
  const label = options.label ?? toPascalCase(name);
  const NAME_UP = name.replace(/-/g, '_').toUpperCase();

  if (tree.exists(`apps/${name}`)) {
    throw new Error(`apps/${name} already exists`);
  }

  // 1. Generate the Angular app (inherits nx.json defaults for e2e/unit test runners)
  await applicationGenerator(tree, {
    directory: `apps/${name}`,
    name,
    style: 'scss',
    routing: true,
    standalone: true,
    skipFormat: true,
  });

  // 2. Set app tags
  const pjPath = `apps/${name}/project.json`;
  const pj = JSON.parse(tree.read(pjPath, 'utf-8')!);
  pj.tags = [`app:${name}`, 'type:app'];
  tree.write(pjPath, JSON.stringify(pj, null, 2));

  // 3. Create the routes re-export file (placeholder; user wires actual routes later)
  tree.write(
    `apps/${name}/src/app/${name}.routes.ts`,
    `import { Route } from '@angular/router';

// Re-export your domain's *_ROUTES here once a domain is created for this MFE.
// Example:
//   export { CUSTOMER_ROUTES as ${NAME_UP}_ROUTES } from '@monorepo-test/domain/customer/shell';
export const ${NAME_UP}_ROUTES: Route[] = [];
`,
  );

  // Update the app's own app.routes.ts to use these routes
  tree.write(
    `apps/${name}/src/app/app.routes.ts`,
    `import { ${NAME_UP}_ROUTES } from './${name}.routes';

export const appRoutes = ${NAME_UP}_ROUTES;
`,
  );

  // 4. Shell wiring — federation.manifest.json
  const manifestPath = 'apps/shell/public/federation.manifest.json';
  if (tree.exists(manifestPath)) {
    const manifest = JSON.parse(tree.read(manifestPath, 'utf-8')!);
    manifest[name] = `http://localhost:${port}/remoteEntry.json`;
    tree.write(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  }

  // 5. Shell wiring — app.routes.ts (insert before the closing ];)
  const shellRoutesPath = 'apps/shell/src/app/app.routes.ts';
  if (tree.exists(shellRoutesPath)) {
    let content = tree.read(shellRoutesPath, 'utf-8')!;
    const newRoute = `  {
    path: '${name}',
    loadChildren: () =>
      loadRemoteModule('${name}', './routes').then((m) => m.${NAME_UP}_ROUTES),
  },
`;
    content = content.replace(/\n\];\s*$/, `\n${newRoute}];\n`);
    tree.write(shellRoutesPath, content);
  }

  // 6. Shell wiring — app.html navbar link (insert before closing </ul>)
  const shellHtmlPath = 'apps/shell/src/app/app.html';
  if (tree.exists(shellHtmlPath)) {
    let content = tree.read(shellHtmlPath, 'utf-8')!;
    const navItem = `    <li><a routerLink="/${name}" routerLinkActive="is-active">${label}</a></li>\n`;
    content = content.replace(/(\s*)<\/ul>/, `${navItem}$1</ul>`);
    tree.write(shellHtmlPath, content);
  }

  // 7. eslint.config.mjs — add app:<name> and mfe:<name> boundary rules
  const eslintPath = 'eslint.config.mjs';
  if (tree.exists(eslintPath)) {
    let content = tree.read(eslintPath, 'utf-8')!;
    const appRule = `            {
              sourceTag: 'app:${name}',
              onlyDependOnLibsWithTags: ['mfe:${name}'],
            },
`;
    const mfeRule = `            {
              sourceTag: 'mfe:${name}',
              onlyDependOnLibsWithTags: ['mfe:${name}'],
            },
`;
    // Insert app rule before the "// MFE-bound libs" comment
    content = content.replace(
      /(\s*\/\/ MFE-bound libs[^\n]*\n)/,
      `${appRule}$1`,
    );
    // Insert mfe rule before the "// Domain scopes" comment
    content = content.replace(
      /(\s*\/\/ Domain scopes[^\n]*\n)/,
      `${mfeRule}$1`,
    );
    tree.write(eslintPath, content);
  }

  // 8. package.json — add start:<name> / build:<name> + extend start/build run-many lists
  const packagePath = 'package.json';
  const packageJson = JSON.parse(tree.read(packagePath, 'utf-8')!);
  packageJson.scripts = packageJson.scripts ?? {};
  packageJson.scripts[`start:${name}`] = `nx run ${name}:serve`;
  packageJson.scripts[`build:${name}`] = `nx run ${name}:build`;
  if (typeof packageJson.scripts.start === 'string') {
    packageJson.scripts.start = packageJson.scripts.start.replace(
      /--projects=([a-z0-9,-]+)/,
      (_m: string, list: string) =>
        `--projects=${list.split(',').concat(name).join(',')}`,
    );
  }
  if (typeof packageJson.scripts.build === 'string') {
    packageJson.scripts.build = packageJson.scripts.build.replace(
      /--projects=([a-z0-9,-]+)/,
      (_m: string, list: string) =>
        `--projects=${list.split(',').concat(name).join(',')}`,
    );
  }
  tree.write(packagePath, JSON.stringify(packageJson, null, 2) + '\n');

  await formatFiles(tree);

  logger.info(`✓ Created MFE app "${name}" on port ${port}`);
  logger.info(
    `  Shell wired: /${name} route, topbar link "${label}", federation.manifest entry`,
  );
  logger.info(
    `  npm scripts added: start:${name}, build:${name}`,
  );
  logger.info(
    `  Next step: native-federation :init will run (remote mode) to generate federation.config.js, bootstrap.ts, and the federated build target.`,
  );

  // 9. Post-write callback: run @angular-architects/native-federation:init on disk
  return () => {
    execSync(
      `npx nx g @angular-architects/native-federation:init --project=${name} --port=${port} --type=remote --no-interactive`,
      { stdio: 'inherit' },
    );
    // The federation schematic generates `./apps/${name}/src/app/${name}.routes.ts`-independent
    // main.ts / bootstrap.ts — it will also install federation-related packages if needed.
  };
}

export default mfeGenerator;
