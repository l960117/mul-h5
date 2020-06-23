/**
 * @description 限制需要渲染的页面
 * 可能变动的参数：
 * folderNames(文件夹名称集合)
 * isRenderAllPage(是否渲染全部文件夹（默认开启，调试时手动关闭）)
 */

// 引入相关工具类
let getEntries = require('../build/getEntries')
let pages = getEntries('./src/pages/**/*.html')

// 文件夹名称集合
let folderNames = ['psychological-test']

// 是否渲染全部文件夹（默认开启）
let isRenderAllPage = true

// 路径名称集合（适配getEntries返回的结构）
let pathNames = folderNames.map(item => {
  return 'pages/' + item
})

// 需要渲染的页面
let needRenderPages = {}

if (isRenderAllPage) { // 开启则默认渲染全部
  needRenderPages = pages
} else { // 关闭则按配置渲染
  pathNames.forEach(item => {
    if(!needRenderPages[item]) {
      needRenderPages[item] = pages[item]
    }
  })
}

module.exports = needRenderPages
