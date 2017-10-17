
var root = __dirname;
var fs = require('fs');
var parse = require('url').parse;
var path = require('path');
var render = require('./render').render;
var processdata = require('./processdata');
var staticFileDirPath = path.resolve(root, '../src');

module.exports = function(db) {
    var procdataobj = processdata(db);
    return function(req, res) {
        switch(req.method) {
            case 'POST' : 
                res.end('post');
            break;
            case 'GET' : 
                var thisUrl = req.url;
                var seps = thisUrl.split(path.sep);
                if(seps[1] && seps[1] == 'aj') {
                    // aj接口
                    var pathname = parse(thisUrl).pathname;
                    var query = parse(thisUrl).query;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    switch(pathname) {
                        case '/aj/getallsumm': 
                            procdataobj.getAllSumm(function(data, fields) {
                                res.end(JSON.stringify(data));
                            });
                        break;
                        case '/aj/getarticle' : 
                            Number(query) ? procdataobj.getarticle(Number(query), function(data, fields) {
                                res.end(JSON.stringify(data));
                            }) : res.end('莫慌!');
                        break;
                        default : 
                            res.end('莫慌!');
                    }
                    // res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    // var stream = fs.createReadStream(path.join(staticFileDirPath, 'md/test.md'));
                    // var buffer = '';
                    // stream.on('data', function(chunk) {
                    //     buffer += chunk;
                    // });
                    // stream.on('end', function() {
                    //     // res.end(render(buffer));
                        // res.end(JSON.stringify(parse(thisUrl)));
                    // });
                } else {
                    switch(thisUrl) {
                        // 静态服务器
                        case '/' :
                        thisUrl = '/index.html';
                        default : 
                        var filePath = path.join(staticFileDirPath, parse(thisUrl).pathname);
                        fs.stat(filePath, function(err, stat) {
                            if(err) {
                                if('ENOENT' == err.code) {
                                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                                    res.end('正在开发！莫慌！');
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
                }
            break;
        }
    };
};