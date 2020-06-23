const HOST = require('../api.js');

/*
* SOURCEAPI 为node的API
*
* NAILAPI 为内部转发API
*
* */

module.exports = {
  OUTSIDEPAI: {
    // 登录
    loginIn: HOST.MAIN_API + '/insnail-character-test-system/api/tester/login',
    // 获取试题
    getQuestion: HOST.MAIN_API + '/insnail-character-test-system/api/tester/test',
    // 获取剩余时间
    getLeftTime: HOST.MAIN_API + '/insnail-character-test-system/api/tester/time',
    // 提交答案
    submitResult: HOST.MAIN_API + '/insnail-character-test-system/api/tester/answer/submit',
    // 到时间自动提交
    autoSubmitResult: HOST.MAIN_API + '/insnail-character-test-system/api/tester/submit/on/time'
  },
  SOURCEAPI: {
    // 登录
    loginIn: '/api/tester/login',
    // 获取试题
    getQuestion: '/api/tester/test',
    // 获取剩余时间
    getLeftTime: '/api/tester/time/:testerId',
    // 提交答案
    submitResult: '/api/tester/answer/submit',
    // 到时间自动提交
    autoSubmitResult: '/api/tester/submit/on/time'
  }
}
