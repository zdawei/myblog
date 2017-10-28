
var md = require('marked');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var viewFileDirPath = path.resolve(__dirname, '../views');

module.exports = function(db) {

    var tools = {
        redirect : function(res) {
            res.statusCode = 302;
            res.statusMessage = 'Moved Temporarily';
            res.setHeader('Location', '/');
            res.end();
        }
    };

    var api = {
        renderDefault : function(req, res) {
            // 默认页面
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end('正在开发！');
        },
        renderError : function(req, res, err) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(err.toString()); 
        },
        renderIndex : function(req, res) {
            // 博客首页
            var filePath = path.join(viewFileDirPath, 'body.ejs');
            ejs.renderFile(filePath, {
                root : viewFileDirPath
            }, function(err, template) {
                if(err) api.renderError(req, res, err);
                res.end(template);
            });
        },
        renderSementic : function(req, res) {
            if(req.url.split(path.sep)[2] == 'dist') {
                var stream = fs.createReadStream(path.resolve(__dirname, '../' + req.url));
                stream.pipe(res);            
                stream.on('error', function(err) {
                    api.renderError(req, res, err);
                });               
            } else {
                api.renderError(req, res, '禁止访问!');
            }
        },
        renderOther : function(req, res) {
            var stream = fs.createReadStream(path.resolve(__dirname, '../public' + req.url));
            stream.pipe(res);            
            stream.on('error', function(err) {
                api.renderError(req, res, err);
            });
        }
    };


    return api;
    // return {
    //     redirect : tools.redirect,
    //     renderIndex : function(res) {
    //         processdataobj.getAllSumm(function(data, fields) {
    //             var filePath = path.join(staticFileDirPath, 'body.ejs');
    //             ejs.renderFile(filePath, {data : data}, {
    //                 root : staticFileDirPath
    //             }, function(err, template) {
    //                 if(err) throw err;
    //                 res.end(template);
    //                 // res.end(JSON.stringify(data));
    //             });
    //         });
    //     },
    //     rendersingle : function(res, id) {
    //         var idNum = Number(id);
    //         (idNum && idNum > 0) ? processdataobj.getarticle(idNum, function(data, fields) {
    //             if(data && data.length) {
    //                 var filePath = path.join(staticFileDirPath, 'detail.ejs');
    //                 ejs.renderFile(filePath, {data : (data && data.length) ? data[0] : null}, {
    //                     root : staticFileDirPath
    //                 }, function(err, template) {
    //                     if(err) throw err;
    //                     res.end(template);
    //                     // res.end(JSON.stringify(data));
    //                 });
    //             } else {
    //                 tools.redirect(res);
    //             }
    //         }) : tools.redirect(res);;
    //     },  
    //     renderWrite : function(res, seqs) {
    //         if(seqs.length == 2 && seqs[1] == 'write') {
    //             var filePath = path.join(staticFileDirPath, 'write.ejs');
    //             ejs.renderFile(filePath, {}, {
    //                 root : staticFileDirPath
    //             }, function(err, template) {
    //                 if(err) throw err;
    //                 res.end(template);
    //             });
    //         } else {
    //             tools.redirect(res);              
    //         }
    //     },
    //     renderEdit : function(res, id) {
    //         var idNum = Number(id);
    //         (idNum && idNum > 0) ? processdataobj.getarticle(idNum, function(data, fields) {
    //             if(data && data.length) {
    //                 var filePath = path.join(staticFileDirPath, 'edit.ejs');
    //                 ejs.renderFile(filePath, {data : (data && data.length) ? data[0] : null}, {
    //                     root : staticFileDirPath
    //                 }, function(err, template) {
    //                     if(err) throw err;
    //                     res.end(template);
    //                     // res.end(JSON.stringify(data));
    //                 });
    //             } else {
    //                 tools.redirect(res);
    //             }
    //         }) : tools.redirect(res);
    //     },
    //     renderOther : function(res) {
    //         var stream = fs.createReadStream(path.resolve(__dirname, '../src'));
    //         stream.pipe(res);
    //     }
    // };
};