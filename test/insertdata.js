
var insertdata = {
    1 : ['"测试文章1"', '"文章1预览"','"文章1内容"'],
    2 : ['"测试文章2"', '"文章2预览"','"文章2内容"'],
    3 : ['"测试文章3"', '"文章3预览"','"文章3内容"'],
    4 : ['"测试文章4"', '"文章4预览"','"文章4内容"'],
    5 : ['"测试文章5"', '"文章5预览"','"文章5内容"'],
    6 : ['"测试文章6"', '"文章6预览"','"文章6内容"'],
    7 : ['"测试文章7"', '"文章7预览"','"文章7内容"']
};

module.exports = function(db) {
    db.query('select count(*) as num from blogs;', function(err, data) {
        if(err) throw err;
        if(!data[0].num) {
            var template = 'insert into blogs(title, summary, content) values($insert$);';
            for(var i in insertdata) {
                db.query(template.replace(/\$insert\$/g, insertdata[i].join(',')), function(err) {
                    if(err) throw err;
                });
            }
        }
    });
}