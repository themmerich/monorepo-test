import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            // Apps may only consume libs assigned to their MFE
            {
              sourceTag: 'app:shell',
              onlyDependOnLibsWithTags: ['type:app'],
            },
            {
              sourceTag: 'app:cbs',
              onlyDependOnLibsWithTags: ['mfe:cbs'],
            },
            {
              sourceTag: 'app:wau',
              onlyDependOnLibsWithTags: ['mfe:wau'],
            },
            // MFE-bound libs may only depend on libs of the same MFE
            {
              sourceTag: 'mfe:cbs',
              onlyDependOnLibsWithTags: ['mfe:cbs'],
            },
            {
              sourceTag: 'mfe:wau',
              onlyDependOnLibsWithTags: ['mfe:wau'],
            },
            // Domain scopes may not leak across domains (intersected with mfe rules)
            {
              sourceTag: 'scope:provision',
              onlyDependOnLibsWithTags: ['scope:provision'],
            },
            {
              sourceTag: 'scope:auswertung',
              onlyDependOnLibsWithTags: ['scope:auswertung'],
            },
            // DDD layer hierarchy
            {
              sourceTag: 'type:shell',
              onlyDependOnLibsWithTags: [
                'type:shell',
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:model',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:data-access',
                'type:model',
                'type:util',
              ],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:util'],
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:model', 'type:util'],
            },
            {
              sourceTag: 'type:model',
              onlyDependOnLibsWithTags: ['type:model', 'type:util'],
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util'],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
