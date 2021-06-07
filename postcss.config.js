module.exports = {
  plugins: {
      'postcss-advanced-variables': {},
      'postcss-nested': {},
      'postcss-focus': {},
      'postcss-extend-rule': {},
      'postcss-property-lookup': {},
      // 'postcss-initial': {},
      'postcss-sorting': {
          order: ["custom-properties", "dollar-variables", "declarations", "rules", "at-rules"],
          'clean-empty-lines': true
      },
      cssnano: {
          preset: ['default', {
              discardComments: {
                  removeAll: true,
                  minimize: {safe: true}
              },
          }],
      },
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', 'iOS >= 8']
      }
  }
};

