const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const helpers = require('./helpers');

const config = require('./app.config');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                include: [
                    helpers.root('src', 'assets', 'stylesheets'),
                    helpers.root('node_modules')
                ],
                loader: 'null-loader',
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'assets', 'stylesheets'),
                use: [
                    {
                        loader: 'raw-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.ts$/,
                exclude: [/\.(spec|e2e)\.ts$/],
                use: [
                    {
                        loader: 'awesome-typescript-loader'
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ]
            },
            {
                test: /\.(spec|e2e)\.ts$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null-loader'
            }

        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            WEBPACK_CONFIG: JSON.stringify(config.test)
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        )
    ],
}