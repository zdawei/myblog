
module.exports = function(db) {

    return {
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
            db.query('insert into blogs(title, summary, content) value("' + obj.title + '","' + obj.content.slice(0, 50) + '","' + obj.content + '");', function(err) {
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

};