let locale = require("locale");

module.exports = function(req) {

  // 默认支持的语言。
  const supported = new locale.Locales(["en", "zh"])
  const locales = new locale.Locales(req.headers["accept-language"])

  return locales.best(supported)["language"].toUpperCase();

};
