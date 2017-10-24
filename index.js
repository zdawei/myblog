
var http = require('http');
var initDB = require('./lib/processdata');
// var mysql = require('mysql');
// var router = require('./lib/router');
// var insertdata = require('./test/insertdata');

// var db = mysql.createConnection({
//     host : '127.0.0.1',
//     user : 'root',
//     password : '123',
//     database : 'myblog'
// });

// db.connect();

// db.query(
//     'create table if not exists blogs(\
//         id int unsigned not null primary key AUTO_INCREMENT,\
//         title char(10) not null,\
//         time timestamp,\
//         summary char(50) not null,\
//         content mediumtext \
//     )character set = utf8, AUTO_INCREMENT = 1;\
//     ', 
//     function(err) {
//         if(err) throw err;
//         // insertdata(db);
//         var server = http.createServer(router(db)).listen(3000, '127.0.0.1');
//         console.log('Server started...');
//     }
// );

initDB(function(db) {
    http.createServer(function(req, res) {
        res.end('ok');
    }).listen(3000, '127.0.0.1');
});

