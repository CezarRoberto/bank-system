module.exports = {
    presets: [
      [
        '@babel/preset-env',
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
            '@whatsapp': './src/modules/whatsapp',
            '@instagram': './src/modules/instagram',
            '@livechat': './src/modules/livechat',
            '@chat2desk': './src/shared/modules/chat2desk',
            '@configs': './src/configs',
          },
        },
      ],
    ],
    ignore: ['**/__tests__/**'],
  };
  