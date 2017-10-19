
var md = require('marked');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var processdata = require('./processdata');
var staticFileDirPath = path.resolve(__dirname, '../src');

module.exports = function(db) {

    var processdataobj = processdata(db);

    var tools = {
        redirect : function(res) {
            res.statusCode = 302;
            res.statusMessage = 'Moved Temporarily';
            res.setHeader('Location', '/');
            res.end();
        }
    };

    return {
        redirect : tools.redirect,
        renderIndex : function(res) {
            processdataobj.getAllSumm(function(data, fields) {
                var filePath = path.join(staticFileDirPath, 'body.ejs');
                ejs.renderFile(filePath, {data : data}, {
                    root : staticFileDirPath
                }, function(err, template) {
                    if(err) throw err;
                    res.end(template);
                    // res.end(JSON.stringify(data));
                });
            });
        },
        rendersingle : function(res, id) {
            var idNum = Number(id);
            (idNum && idNum > 0) ? processdataobj.getarticle(idNum, function(data, fields) {
                if(data && data.length) {
                    var filePath = path.join(staticFileDirPath, 'detail.ejs');
                    ejs.renderFile(filePath, {data : (data && data.length) ? data[0] : null}, {
                        root : staticFileDirPath
                    }, function(err, template) {
                        if(err) throw err;
                        res.end(template);
                        // res.end(JSON.stringify(data));
                    });
                } else {
                    tools.redirect(res);
                }
            }) : tools.redirect(res);;
        },  
        renderWrite : function(res, seqs) {
            if(seqs.length == 2 && seqs[1] == 'write') {
                var filePath = path.join(staticFileDirPath, 'write.ejs');
                ejs.renderFile(filePath, {}, {
                    root : staticFileDirPath
                }, function(err, template) {
                    if(err) throw err;
                    res.end(template);
                });
            } else {
                tools.redirect(res);              
            }
        },
        renderEdit : function(res, id) {
            var idNum = Number(id);
            (idNum && idNum > 0) ? processdataobj.getarticle(idNum, function(data, fields) {
                if(data && data.length) {
                    var filePath = path.join(staticFileDirPath, 'edit.ejs');
                    ejs.renderFile(filePath, {data : (data && data.length) ? data[0] : null}, {
                        root : staticFileDirPath
                    }, function(err, template) {
                        if(err) throw err;
                        res.end(template);
                        // res.end(JSON.stringify(data));
                    });
                } else {
                    tools.redirect(res);
                }
            }) : tools.redirect(res);;
        }
    };
};