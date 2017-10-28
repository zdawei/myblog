const path = require('path');

module.exports = {
    entry: {
      home : './src/js/home/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js')
    },
    resolve: {
        alias: {
            jquery : __dirname + '/node_modules/jquery/dist/jquery.min.js',
            sementicJs : __dirname + '/semantic/dist/semantic.min.js'
        }
    }
};