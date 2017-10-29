
var mysql = require('mysql');
var crypto = require('./encrypt');

var db = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password : '123'
});

db.connect();

var tools = {
    hasInTable : function(key, value, table, cb) {
        // 数据表是否包含数据，如果包含返回true，否则返回false
        if(table == 'user' && key == 'password') {
            value = '"' + crypto.aesEncode(value, key) + '"';
        }
        db.query('select count(' + key + ') as ishas from ' + table + ' where ' + key + ' = ' + value + ' limit 1;', function(err, data) {
            cb(err, !!data[0].ishas);
        });
    }
};

module.exports = function(server) {

    var api = {
        createUser : function(name, pwd, cb) {
            // 注册用户
            tools.hasInTable('name', '"' + name + '"', 'user', function(err, ishas) {
                if(err || ishas) {
                    cb(false);
                } else {
                    db.query('insert into user(name, password) values("' + name + '", "' + crypto.aesEncode(pwd, 'password') + '");', function(err) {
                        if(err) {
                            cb(false);
                        } else {
                            cb(true);
                        }
                    });
                }
            });
        },
        checkUser : function(name, pwd, cb) {
            // 检查用户，是否用户名和密码输入正确
            db.query('select password from user where name="' + name + '";', function(err, data) {
                if(err) cb(false);
                if(data.length == 1 && data[0].password == crypto.aesEncode(pwd, 'password')) {
                    cb(true);
                } else {
                    cb(false);
                }
            });
        },
        createClassify : function(type, name, cb) {
            // 创建分类
            db.query('insert into classify(type, name) values("' + type + '", "' + name + '");', function(err) {
                if(err) cb(false);
                cb(true);
            });
        },
        deleteClassify : function(type, name, cb) {
            // 删除分类
            db.query('delete from classify where type="' + type + '", name="' + name + '"', function(err) {
                if(err) cb(false);
                cb(true);
            });
        },
        /////////////////
        getAllSumm : function(cb) {
            db.query('select time , summary, id, title from blogs;', function(err, res, fields) {
                if(err) throw err;
                cb && cb(res, fields);
            });
        },
        getarticle : function(id, cb) {
            db.query('select * from blogs where id=' + id + ';', function(err, res, fields) {
                if(err) throw err;
                cb && cb(res, fields);
            });            
        },
        insertarticle : function(obj) {
            db.query('insert into blogs(title, summary, content) values("' + obj.title + '","' + obj.content.slice(0, 50) + '","' + obj.content + '");', function(err) {
                if(err) throw err;
                obj.cb && obj.cb();
            });
        },
        deletearticle : function(id, cb) {
            db.query('delete from blogs where id =' + id + ';', function(err) {
                if(err) throw err;
                cb && cb();
            });
        },
        cleararticle : function(cb) {
            db.query('delete from blogs;', function(err) {
                if(err) throw err;
                cb && cb();
            });
        },
        updataarticle : function(obj) {
            db.query('update blogs set title="' + obj.title + '", content="' + obj.content + '", summary="' + obj.content.slice(0, 50) + '" where id='+obj.id +';', function(err) {
                if(err) throw err;
                obj.cb && obj.cb();
            });
        }
    };

    var tasks = [
        function() {
            // 创建数据库
            db.query('create database if not exists myblog;', function(err) {
                execTasks(err);
            });
        },
        function() {
            // 使用数据库
            db.query('use myblog', function(err) {
                execTasks(err);
            });
        },
        function() {
            // 创建用户配置表
            db.query('create table if not exists user(\
            name char(10) not null primary key,\
            password text not null\
            )character set = utf8;', function(err) {
                execTasks(err);
            });
        },
        function() {
            // 创建分类表
            db.query('create table if not exists classify(\
            type char(10) not null ,\
            name char(10) not null,\
            primary key (type, name),\
            foreign key (name) references user(name)\
            )character set = utf8;', function(err) {
                execTasks(err);
            });
        },
        function() {
            // 创建文章表
            db.query('create table if not exists article(\
            id int unsigned not null primary key AUTO_INCREMENT,\
            name char(10) not null,\
            type char(10) not null,\
            title char(10) not null,\
            time timestamp,\
            summary char(50) not null,\
            content mediumtext ,\
            foreign key (type, name) REFERENCES classify(type, name)\
            )character set = utf8, AUTO_INCREMENT = 1;', function(err) {
                execTasks(err);
            });
        },
        function() {
            // 文章评论表
            db.query('create table if not exists comment(\
            time timestamp,\
            content text,\
            name char(10) default "unknow",\
            id int unsigned not null,\
            foreign key (id) references article(id)\
            )character set = utf8;', function(err) {
                execTasks(err);
            });
        }
    ];
    
    var execTasks = function(err, result) {
        if(err) throw err;
        var currTask = tasks.shift();
        if(currTask) {
            currTask(result);
        } else {
            server(api);
        }
    };

    execTasks();

};