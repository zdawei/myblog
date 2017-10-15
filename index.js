var http = require('http');
var mysql = require('mysql');
var router = require('./lib/router');


var db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '123',
    database : 'test'
});

var server = http.createServer(router);

db.connect();

db.query(
    'create table if not exists work(\
        name char(10) not null,\
        id int(10) not null,\
        text char(100) not null\
    );', 
    function(err) {
        if(err) {
            throw err;
        }
        console.log('Server started...');
        server.listen(3000, '127.0.0.1');
    }
);
db.query(
    'show columns from work;',
    function(err, res) {
        if(err) throw err;
        // console.log(res);
    }
);
db.query(
    'drop table if exists work;',
    function(err) {
        if(err) throw err;
    }
);