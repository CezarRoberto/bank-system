module.exports = {
    presets: [
      [
        '@babel/preset-env',
        "@babel/preset-typescript",
        {
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: false }],
      ['@babel/plugin-proposal-private-methods', { loose: false }],
      ['@babel/plugin-transform-typescript', { allowNamespaces: true }],
      [
        'module-resolver',
        {
          alias: {
            '@shared': './src/shared',
            '@errors': './src/shared/error',
            '@modules': './src/modules/'
          },
        },
      ],
    ],
    ignore: ['**/__tests__/**'],
  };
  