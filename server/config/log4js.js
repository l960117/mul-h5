const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: { type: 'console' },
    allLog: {
      type: 'dateFile',
      filename: '/root/logs/mul_h5_server.log',
      pattern: ".yyyy-MM-dd",
      maxLogSize: 10485760,
      keepFileExt: true,
      compress : true,
      layout: {
        "type": "messagePassThrough"
      },
      backups: 7
    },
    httpLog: {
      type: "dateFile",
      filename: "/root/logs/mul_h5_http.log",
      pattern: ".yyyy-MM-dd",
      maxLogSize: 10485760,
      compress : true,
      layout: {
        "type": "messagePassThrough"
      },
      keepFileExt: true,
      backups: 7
    }
  },
  categories: {
    http: { appenders: ['out', 'httpLog'], level: "info" },
    default: { appenders: ['out', 'allLog'], level: 'trace' }
  }
});
const logger = log4js.getLogger("mulH5");

const httpLog = log4js.getLogger('http');
const httpLogger = log4js.connectLogger(httpLog, { level: 'WAIN' });

exports = module.exports = { logger, httpLogger };
