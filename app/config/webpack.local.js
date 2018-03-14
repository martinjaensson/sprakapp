const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const config = require('./app.config');

module.exports = webpackMerge(commonConfig, {  
    
    output: {
        
        filename: '[name].[hash].bundle.js',

        sourceMapFilename: '[name].[hash].bundle.map',

        chunkFilename: '[name].[hash].chunk.js'
    
    },
    
    devtool: 'eval',

    plugins: [
        new webpack.DefinePlugin({
            WEBPACK_CONFIG: JSON.stringify(config.LOCAL)
        })
    ],
    
    devServer: {
        port: 8080,
        host: 'localhost',
        disableHostCheck: true,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 5000,
            ignored: /node_modules/
        },
    }
});