const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const helpers = require('./helpers');

const config = require('./app.config');

module.exports = {  

    devtool: 'inline-source-map',

    resolve: {
        modules: [
            helpers.root('src'),
            'node_modules'
        ],
        extensions: ['.js', '.ts'],
    },

    module: {

        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]

    },

    plugins: [
        new webpack.DefinePlugin({
            WEBPACK_ENV: JSON.stringify(config.test)
        })
    ]
};