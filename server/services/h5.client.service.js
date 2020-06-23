const rp = require('request-promise');
const request = require('request');
const proxyRequest = require('../models/proxyRequest');

const { SOURCEAPI, OUTSIDEPAI } = require('../lib/api-pool.js');

const logger = require('../config/log4js').logger;

const handleErr = (err) => {
  // TODO:do something
  logger.error('error', err)
};

const handleRes = (res, data) => {
  // console.log(data, Object.prototype.toString.call(data));

  if (Object.prototype.toString.call(data) === '[object String]') {
    data = JSON.parse(data)
  }
  // console.log(data)
  logger.info('data', data)
  res.json(data);

  res.end();
};

module.exports = function(app) {

  // app.get(SOURCEAPI.getDiseases, (req, res) => {
  //   console.log(333333)

  //   const url = `${NAILAPI.getDiseases}`;

  //   const options = proxyRequest.getModels(req, 'json', url, true);

  //   rp(options)
  //     .then(parsedBody => handleRes(res, parsedBody))
  //     .catch(err => handleErr(err));

  // });
  // 登录
  app.post(SOURCEAPI.loginIn, (req, res) => {

    const url = `${OUTSIDEPAI.loginIn}`;

    res.header("Access-Control-Allow-Credentials",true);

    const options = proxyRequest.postModels(req, 'json', url, false);

    rp(options)
      .then(parsedBody => {
        if (parsedBody.headers['set-cookie']) {
          parsedBody.headers['set-cookie'].forEach(item => {
            res.cookie(item.substring(0, item.indexOf('=')), item.substring(item.indexOf('=')), item.length)
          })
        }
        handleRes(res, parsedBody.body)
      })
      .catch(err => handleErr(err));

  });
  // 获取题目列表
  app.post(SOURCEAPI.getQuestion, (req, res) => {

    const url = `${OUTSIDEPAI.getQuestion}`;

    const options = proxyRequest.postModels(req, 'json', url, false);
    logger.info('option', options)
    rp(options)
      .then(parsedBody => handleRes(res, parsedBody.body))
      .catch(err => handleErr(err));

  });
  // 获取剩余时间
  app.get(SOURCEAPI.getLeftTime, (req, res) => {

    const url = `${OUTSIDEPAI.getLeftTime}/${req.params.testerId}`;

    const options = proxyRequest.getModels(req, 'json', url, true);

    rp(options)
      .then(parsedBody => handleRes(res, parsedBody))
      .catch(err => handleErr(err));

  });
  // 提交答案
  app.post(SOURCEAPI.submitResult, (req, res) => {
    console.log(`${OUTSIDEPAI.submitResult}`)

    const url = `${OUTSIDEPAI.submitResult}`;

    const options = proxyRequest.postModels(req, 'json', url, false);

    logger.info('option', options)
    rp(options)
      .then(parsedBody => handleRes(res, parsedBody.body))
      .catch(err => handleErr(err));

  });
  // 自动提交
  app.post(SOURCEAPI.autoSubmitResult, (req, res) => {

    const url = `${OUTSIDEPAI.autoSubmitResult}`;

    const options = proxyRequest.postModels(req, 'json', url, false);

    rp(options)
      .then(parsedBody => handleRes(res, parsedBody.body))
      .catch(err => handleErr(err));

  });
};
