// refer: https://github.com/jaketrent/html-webpack-template
// 参考了script部分

const config = require('../config')

const statciPath = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production')
  ? '../../' + config.build.assetsSubDirectory + '/'
  : '../../' + config.dev.assetsSubDirectory + '/'

// 工程组件，用于提前编译
const thirdPartyJS = {
  // 特殊性脚本
  'staticScripts': [
    'flexible.js',
    'analysis.js',
    'server.config.js'
  ]
};

let thirdPartyScripts = '';

thirdPartyJS['staticScripts'].map(function(obj){
  thirdPartyScripts += `<script type='text/javascript' src='${statciPath + obj}'></script>`
})

module.exports = thirdPartyScripts;
