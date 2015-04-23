'use strict';

var express = require('express');
var config  = require('./config');
var app     = express();
var server = require('http').createServer(app);
require('./express')(app);
require('./routes')(app);

var server = app.listen(config.port, config.ip, function () {
    console.log(config.root);
    console.log('iEos listening at http://%s:%s', config.ip, config.port);
});

exports = module.exports = app;
