
var root = __dirname;
var fs = require('fs');
var parse = require('url').parse;
var path = require('path');
var staticFileDirPath = path.resolve(root, '../src');

module.exports = function(req, res) {
    switch(req.method) {
        case 'POST' : 
            res.end('post');
        break;
        case 'GET' : 
            var thisUrl = req.url;
            switch(thisUrl) {
                case '/' :
                    thisUrl = '/index.html';
                default : 
                    var filePath = path.join(staticFileDirPath, parse(thisUrl).pathname);
                    fs.stat(filePath, function(err, stat) {
                        if(err) {
                            if('ENOENT' == err.code) {
                                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                                res.end('正在开发!莫慌！');
                            } else {
                                res.statusCode = 500;
                                res.end('500\nInternal Server Error!');
                            }
                        } else {
                            var stream = fs.createReadStream(filePath);
                            stream.pipe(res);
                            stream.on('error', function(err) {
                                res.statusCode = 500;
                                res.end('500\nInternal Server Error!');
                            });
                        }
                    });
                break;
            }
        break;
    }
};