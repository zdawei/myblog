
var querystring = require('querystring');
var path = require('path');
var encrypt = require('./encrypt');

module.exports = function(db) {

    var tools = {
        redirect : function(req, res) {
            res.statusCode = 302;
            res.statusMessage = 'Moved Temporarily';
            res.setHeader('Location', '/');
            res.end();
        },
        login : function(req, res) {
            var reqData = '';
            req.on('data', function(chunk) {reqData += chunk;});
            req.on('end', function() {
                var data =  querystring.parse(reqData);
                db.checkUser(data.name, data.password, function(bool) {
                    if(bool) {
                        res.setHeader('Content-Type', 'text/html; charset=utf-8');
                        res.setHeader('Set-Cookie', 'UID=' + encrypt.aesEncode('name='+data.name + '&password=' + data.password, 'UID') + ';Path=/');
                        tools.redirect(req, res);
                    } else {
                        res.end('登录失败');
                    }
                });
            });
        },
        logout : function(req, res) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Set-Cookie', 'UID=;Path=/');
            tools.redirect(req, res);
        },
        register : function(req, res) {
            var reqData = '';
            req.on('data', function(chunk) {reqData += chunk;});
            req.on('end', function() {
                var data =  querystring.parse(reqData);
                if(!(data.name && data.password)) {
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end('注册失败');
                } else {
                    db.createUser(data.name, data.password, function(bool) {
                        res.setHeader('Content-Type', 'text/html; charset=utf-8');
                        if(bool) {
                            res.end('注册成功');
                        } else {
                            res.end('注册失败');
                        }
                    });
                }
            });
        }
    };

    var get = function(req, res) {
        var seps = req.url.split(path.sep);
        if(seps[2] in tools) {
            tools[seps[2]](req, res);
        } else {
            tools.redirect(req, res);
        }
    };

    var post = function(req, res) {
        var seps = req.url.split(path.sep);
        if(seps[2] in tools) {
            tools[seps[2]](req, res);
        } else {
            tools.redirect(req, res);
        }
    };

    return {
        get : get,
        post : post
    };

};