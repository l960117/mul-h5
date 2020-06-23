#!/usr/bin/env node
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


let express = require('../server/config/express')
let http = require('http')
// https = require('https'),
let app = express()
let webPort = require('../server/lib/port')

const webHttpPort = webPort.PLATFORM_PORT;
const serverHttp = http.createServer(app);

serverHttp.listen(webHttpPort, () => {
  console.log('HTTP Server is running on: http://localhost:%s', webHttpPort);
});

module.exports = app;

