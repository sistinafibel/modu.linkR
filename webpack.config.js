// webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');

// webpack.config.js
module.exports = {
    entry: './assets/js/main.js',
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/assets/js/dist',
        filename: 'main.min.js'
    }/*,
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Hello Webpack Project!',
          template: './src/index.ejs'
        })
    ]*/
};