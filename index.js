var http = require('http');
var mysql = require('mysql');
var router = require('./lib/router');
var insertdata = require('./test/insertdata');

var db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '123',
    database : 'myblog'
});

db.connect();

db.query(
    'create table if not exists blogs(\
        id int unsigned not null,\
        title char(10) not null,\
        time timestamp,\
        summary char(10) not null,\
        content mediumtext \
    )character set = utf8;\
    ', 
    function(err) {
        if(err) throw err;
        insertdata(db);
        var server = http.createServer(router(db)).listen(3000, '127.0.0.1');
        console.log('Server started...');
    }
);