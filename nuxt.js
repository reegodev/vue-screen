const { resolve } = require('path');

module.exports = function vueScreenModule(moduleOptions) {
  const options = Object.assign({}, this.options.screen, moduleOptions);

  this.addPlugin({
    src: resolve(__dirname, 'src', 'nuxt', 'plugin.js'),
    fileName: 'vue-screen.js',
    ssr: true,
    options,
  });
};

module.exports.meta = require('./package.json');
