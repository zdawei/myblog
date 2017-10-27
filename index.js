
var http = require('http');
var initDB = require('./lib/processdata');
var router = require('./lib/router');

initDB(function(db) {
    http.createServer(router(db)).listen(3000, '127.0.0.1');
    console.log('Server start!');
});

