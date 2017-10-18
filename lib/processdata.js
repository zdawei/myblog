
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
        insertarticle : function() {
            
        }
    };

};