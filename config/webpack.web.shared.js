const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const helpers = require('./helpers');

const sharedConfig = require('./webpack.shared.js');

module.exports = webpackMerge(sharedConfig, {
    
    // Output information
    output: {
        path: helpers.root('dist'),
        filename: '[name].js',
    },

    plugins: [
        // Clean distribution folder
        new CleanWebpackPlugin(['dist'], {
            root: helpers.root()
        }),
        
        // Copy web config file for IIS
        new CopyWebpackPlugin([
            {
                from: 'src/web.config'
            }
        ])
    ]
});