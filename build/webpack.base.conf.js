'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const HappyPack = require('happypack');
const os = require('os')
const { VueLoaderPlugin } = require('vue-loader')
const getEntries = require('./getEntries')

const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length}); // 启动线程池})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

var entries = getEntries('./src/pages/**/*.m.js');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.(less|css)$/,
        use: 'happypack/loader?id=styles'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(yml|yaml)$/,
        use: ['json-loader', 'yaml-loader']
      },
      {
        test: /vux.src.*?js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'styles',
      threadPool: HappyThreadPool,
      loaders: ['style-loader','css-loader','less-loader']
    }),
     new HappyPack({
      id: 'yml',
      threadPool: HappyThreadPool,
      loaders: ['json-loader', 'yaml-loader']
    })
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
