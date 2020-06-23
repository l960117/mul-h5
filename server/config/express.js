/* eslint-disable global-require */
const express = require('express');
const path = require('path')
// express-useragent是一个简单的NodeJS / ExpressJS用户代理中间件，将用户代理的详细信息暴露给您的应用程序和视图。
const expressUseragent = require('express-useragent');
// ejs模板
const ejs = require('ejs');
const bodyParser = require('body-parser');

// 基于node-express的一款安全防护中间件,可以通过设置各种HTTP标题来帮助您保护您的Express应用程序。
const helmet = require('helmet');
const cors = require('cors');
const device = require('express-device');

const supported = ['en', 'zh'];
const locale = require('locale');

const httpLogger = require('./log4js.js').httpLogger;


module.exports = function() {

    console.log(process.env.NODE_ENV);

    const app = express();

    app.use(require('connect-history-api-fallback')({
      rewrites: [
        { from: /h5\/psychological-test\/.*$/, to: '/pages/psychological-test.html' }
      ]
    }))

    // 日志收集

    app.use(httpLogger);

    app.disable('x-powered-by');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    // header信息中间件集
    app.use(device.capture());
    app.use(helmet());
    app.use(cors());

    app.use(expressUseragent.express());

    app.use(locale(supported));

    // 模板引擎中间件,待确定
    app.engine('html', ejs.__express);


    // 站点视图文件
    app.set('views', './dist/pages');
    app.set('view engine', 'html');

    // 视图路由
    require('../routes/h5.server.route.js')(app);

    // 静态站点资源目录
    app.use(express.static('./dist'));
    // API
    require('./../services/h5.client.service.js')(app);

    // 定制404页面,待确定
    // app.use(function(req, res, next){
    //   res.redirect(301, 'https://www.igola.com/');
    // });

    app.use(function (err, req, res, next) {
      console.log(req)
      console.error(err.stack, req.useragent)
      let feedbackMessage = req.useragent;
      res.status(500).send('访问异常 - 请确认你当前访问的地址和设备环境: <br/>'+ feedbackMessage.platform + '，' + feedbackMessage.browser + '，' + feedbackMessage.version + '，' + feedbackMessage.os + '<br/>' +  feedbackMessage.source)

    });

    return app;
};
