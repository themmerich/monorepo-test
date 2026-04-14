import { Tree } from '@nx/devkit';

export function toPascalCase(input: string): string {
  return input
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join('');
}

export function deleteDir(tree: Tree, dir: string): void {
  if (!tree.exists(dir)) return;
  for (const child of tree.children(dir)) {
    const childPath = `${dir}/${child}`;
    if (tree.isFile(childPath)) {
      tree.delete(childPath);
    } else {
      deleteDir(tree, childPath);
    }
  }
  tree.delete(dir);
}

export function setAppPrefixInEslint(tree: Tree, projectRoot: string): void {
  const eslintPath = `${projectRoot}/eslint.config.mjs`;
  if (!tree.exists(eslintPath)) {
    return;
  }
  const content = tree.read(eslintPath, 'utf-8')!;
  const updated = content.replace(/prefix: ['"]lib['"]/g, `prefix: 'app'`);
  if (updated !== content) {
    tree.write(eslintPath, updated);
  }
}
