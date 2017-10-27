
// var url = require('url');
var path = require('path');
var querystring = require('querystring');
var render = require('./render');

module.exports = function(db) {

    var renderobj = render(db);

    return function(req, res) {

        var seps = req.url.split(path.sep);

        switch(req.method) {
            case 'POST' : 
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end('正在开发！');
            break;
            case 'GET' : 
                switch(seps[1]) {
                    case '' :
                    case 'index.html' :
                        renderobj.renderIndex(req, res);
                    break;
                    default :
                        res.setHeader('Content-Type', 'text/html; charset=utf-8');
                        res.end('正在开发！');
                }
            break;
            default : 
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                res.end('正在开发！');
        }
    };
    // return function(req, res) {
    //     res.end(JSON.stringify(req.headers));return ;
    //     switch(req.method) {
    //         case 'POST' : 
    //             var thisUrl = req.url;
    //             var seps = thisUrl.split(path.sep);
    //             var query = parse(thisUrl).query;
    //             res.setHeader('Content-Type', 'text/html; charset=uft-8');
    //             switch(seps[2]) {
    //                 case 'write' :
    //                     var data = '';
    //                     req.on('data', function(chunk) {
    //                         data += chunk;
    //                     });
    //                     req.on('end', function() {
    //                         var datas = querystring.parse(data);
    //                         procdataobj.insertarticle({
    //                             title : datas.title,
    //                             content : datas.content,
    //                             cb : function() {
    //                                 renderobj.redirect(res)
    //                             }
    //                         });
    //                     });
    //                 break;
    //                 case 'edit' :
    //                     var data = '';
    //                     req.on('data', function(chunk) {
    //                         data += chunk;
    //                     });
    //                     req.on('end', function() {
    //                         var datas = querystring.parse(data);
    //                         procdataobj.updataarticle({
    //                             id : seps[3],
    //                             title : datas.title,
    //                             content : datas.content,
    //                             cb : function() {
    //                                 renderobj.redirect(res)
    //                             }
    //                         });
    //                     });
    //                 break;
    //             }
    //         break;
    //         case 'GET' : 
    //             var thisUrl = req.url;
    //             var seps = thisUrl.split(path.sep);
    //             if(seps[1] && seps[1] == 'aj') {
    //                 // aj接口
    //                 var pathname = parse(thisUrl).pathname;
    //                 var query = parse(thisUrl).query;
    //                 res.setHeader('Content-Type', 'text/html; charset=utf-8');
    //                 switch(pathname) {
    //                     case '/aj/getallsumm': 
    //                         procdataobj.getAllSumm(function(data, fields) {
    //                             res.end(JSON.stringify(data));
    //                         });
    //                     break;
    //                     case '/aj/getarticle' : 
    //                         Number(query) ? procdataobj.getarticle(Number(query), function(data, fields) {
    //                             res.end(JSON.stringify(data));
    //                         }) : res.end('莫慌!');
    //                     break;
    //                     case '/aj/del' :
    //                         Number(query) ? procdataobj.deletearticle(Number(query), function() {
    //                             renderobj.redirect(res)
    //                         }) : renderobj.redirect(res);
    //                     break;
    //                     case '/aj/clear' :
    //                         procdataobj.cleararticle(function() {
    //                             renderobj.redirect(res);
    //                         });
    //                     break;
    //                     default : 
    //                         res.end('莫慌!');
    //                 }
    //             } else {
    //                 res.setHeader('Content-Type', 'text/html; charset=utf-8');
    //                 switch(seps[1]) {
    //                     // 静态服务器
    //                     case '' :
    //                     case 'index.html' :
    //                         renderobj.renderIndex(res);
    //                     break;
    //                     case 'aid' :
    //                         renderobj.rendersingle(res, seps[2]);
    //                     break;
    //                     case 'write' :
    //                         renderobj.renderWrite(res, seps);
    //                     break;
    //                     case 'edit' :
    //                         renderobj.renderEdit(res, seps[2]);
    //                     break;
    //                     default : 
    //                         renderobj.renderOther(res);
    //                     break;
    //                 }
    //             }
    //         break;
    //     }
    // };
};