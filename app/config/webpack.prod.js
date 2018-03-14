const webpack = require('webpack');

const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const config = require('./app.config');

const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');

module.exports = webpackMerge(commonConfig, {  
    
    output: {

        filename: '[name].[chunkhash].bundle.js',

        sourceMapFilename: '[name].[chunkhash].bundle.map',

        chunkFilename: '[id].[chunkhash].chunk.js'
        
    },
    
    devtool: 'source-map',
    
    plugins: [
        new webpack.DefinePlugin({
            WEBPACK_CONFIG: JSON.stringify(config.PROD)
        }),
        
        // new DedupePlugin(),
        
        new UglifyJsPlugin({
            beautify: false,
            sourceMap: false,

            mangle: {
                screw_ie8 : true,
                //keep_fnames: true
            },

            compress: {
                screw_ie8: true
            },

            comments: false
        }),
        
        new CompressionPlugin({
            regExp: /\.css$|\.html$|\.js$|\.map$/,
            threshold: 2 * 1024
        }),

        // new AppCachePlugin({
        //     cache: [],
        //     network: ['*'],
        //     fallback: [
        //             '/control/inspection /index.html',
        //             '/control/inspection/ /index.html'
        //         ],
        //     settings: [],
        //     exclude: [
        //             '([0-9]+)(.*?)(\.js)', 
        //             '(.*?)(\.map)',
        //             '(.*?)(\.config)'
        //         ],
        //     output: 'dafo-sba.appcache'
        // })
        
    ],


});