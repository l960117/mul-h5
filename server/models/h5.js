const metaSEOLib = require('./../lib/meta-seo.js');
const AcceptLanguage = require('./../lib/locale.js');

module.exports = function(req, viewPagePath) {

  let acceptLanguage = AcceptLanguage(req);

  let viewPath = viewPagePath;

  return {
    viewPath: viewPath,
    acceptLanguage: acceptLanguage,
    metaSEO: metaSEOLib[acceptLanguage]
  };

};
