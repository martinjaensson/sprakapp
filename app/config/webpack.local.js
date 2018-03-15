const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const helpers = require('./helpers');

const commonConfig = require('./webpack.common.js');
const config = require('./app.config');

module.exports = webpackMerge(commonConfig(config.local), {  
    
    output: {
        path: helpers.root('build'),
        filename: '[name].js',
        sourceMapFilename: '[name].map'
    },

    cache: true,
    
    devtool: 'cheap-module-source-map',

    plugins: [

    ],
    
    devServer: {
        port: 8080,
        host: 'localhost',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    }
});