const express = require('express')
const rewrite = require('express-urlrewrite')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const WebpackConfig = require('./webpack.config')
const fs = require('fs')
const path = require('path')
const fse = require('fs-extra');

// console.log(path.join(__dirname, 'node_modules', 'vue-screen'))
try {
  fse.mkdirSync(path.join(__dirname, 'node_modules', 'vue-screen'))
} catch (e) {console.log(e)}

fse.copyFileSync(path.resolve(path.join(__dirname, '..', 'lib', 'package.json')), path.join(__dirname, 'node_modules', 'vue-screen', 'package.json'))
try {
  fse.copySync(path.resolve(path.join(__dirname, '..', 'lib', 'dist')), path.join(__dirname, 'node_modules', 'vue-screen', 'dist'), { overwrite: true })
} catch (e) {console.log(e)}

// fse.createSymlinkSync(path.resolve(path.join(__dirname, '..', 'lib')), path.join(__dirname, 'node_modules', 'vue-screen'))


const app = express()

app.use(webpackDevMiddleware(webpack(WebpackConfig), {
  publicPath: '/__build__/',
  // stats: 'none',
}))

fs.readdirSync(__dirname).forEach(file => {
  if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
  }
})

app.get('/', (req, res) => {
  res.send('Examples ready')
})

app.use(express.static(__dirname))

const port = process.env.EXAMPLES_PORT || 8081
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})
