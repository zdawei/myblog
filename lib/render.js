var md = require('marked');

module.exports.render = function(str) {
    return md(str || '*开*发*中*！莫*慌*！');
};