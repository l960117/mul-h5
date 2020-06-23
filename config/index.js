var path = require('path')

function envPublicPathSwitch(){
  var assetsPublicPath = "/";
  return assetsPublicPath
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'h5-static',
    assetsPublicPath: envPublicPathSwitch(),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    vconsoleDebug: process.env.VCONSOLE_DEBUG,
    host: 'localhost',
    port: 8081,
    notifyOnErrors: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: envPublicPathSwitch(),
    proxyTable: {},
    cssSourceMap: false
  }
}
