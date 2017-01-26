const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const sharedConfig = require('./webpack.web.shared.js');
const helpers = require('./helpers');

const config = require('./app.config');

console.log(config.local);

module.exports = webpackMerge(sharedConfig, {  
    
    output: {
        sourceMapFilename: '[name].map'
    },
    
    debug: true,

    cache: true,
    
    devtool: 'cheap-module-source-map',

    plugins: [
        new webpack.DefinePlugin({
            WEBPACK_CONFIG: JSON.stringify(config.local)
        })
    ],
    
    devServer: {
        port: 8080,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        outputPath: helpers.root('dist')
    }
});