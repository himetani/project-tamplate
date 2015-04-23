'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var config = require('./config');

module.exports = function(app) {
    app.set('views', config.root+ '/server/views');
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use('/client/', express.static('./client/'));
    //app.use('/client/app/vendor', express.static('./client/app/vendor'));
    // bodyparserの設定
    app.use(express.static(path.join(config.root, 'client')));
};
