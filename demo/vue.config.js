const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-screen/'
    : '/',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'vue-screen': path.resolve(__dirname, '../dist/vue-screen.esm.js')
      }
    }
  }
};
