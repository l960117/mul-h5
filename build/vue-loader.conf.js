'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },
  postcss: [
    require('autoprefixer')({
      browsers: ['last 10 versions', 'iOS >= 8', 'Android >= 4.4']
    }),
    require('postcss-plugin-px2rem')({
      rootValue: 75,
      selectorBlackList: ['html', 'disable-px2rem'],
      exclude: /(node_module)/,
      mediaQuery: true,
      propBlackList: ['border']
    })
  ]
}
