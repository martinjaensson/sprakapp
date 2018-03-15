const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');
const config = require('./app.config');

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = webpackMerge(commonConfig(config.prod), {

    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].bundle.js',
        sourceMapFilename: '[name].[chunkhash].bundle.map',
        chunkFilename: '[id].[chunkhash].chunk.js'
    },

    plugins: [

        new UglifyJsPlugin({
            beautify: false,
            sourceMap: false,

            mangle: {
                screw_ie8: true
            },

            compress: {
                screw_ie8: true
            },

            comments: false
        }),

        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })

    ]
});