const h5Models = require('../models/h5.js');

exports.render = function(req, res) {

  const h5Model = h5Models(req, 'index');

  res.render(h5Model.viewPath, {
    acceptLanguage: h5Model.acceptLanguage,
    metaTitle: h5Model.metaSEO.find_flights_title
  });

};
