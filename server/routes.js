'use strict';

var path = require('path');

module.exports = function(app) {
    app.use('/api/', require('./api/'));
    app.route('/*')
    .get(function(req, res) {
        res.sendFile('index.html', {root: path.normalize(__dirname + '/../client')} );
    })

};
