// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    "postcss-plugin-px2rem": {
      rootValue: 75,
      selectorBlackList: ['disable-px2rem'],
      exclude: /(node_module)/,
      mediaQuery: true,
      propBlackList: ['border']
    }
  }
}
