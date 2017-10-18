
var parse = require('url').parse;
var path = require('path');
var render = require('./render');
var processdata = require('./processdata');

module.exports = function(db) {

    var procdataobj = processdata(db);
    var renderobj = render(db);

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
                } else {
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    switch(seps[1]) {
                        // 静态服务器
                        case '' :
                        case 'index.html' :
                            renderobj.renderIndex(res);
                        break;
                        case 'aid' :
                            renderobj.rendersingle(res, seps[2]);
                        break;
                        case 'write' :
                            renderobj.renderWrite(res, seps);
                        break;
                        default : 
                            res.end('正在开发！莫慌！');
                        break;
                    }
                }
            break;
        }
    };
};