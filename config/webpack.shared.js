// Webpack
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Helper methods
const helpers = require('./helpers');

/**
 * General configuration used for all webpack builds
 */
module.exports = {
    
    // Entry points
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts',
        'styles': './src/styles.ts'
    },
    
    resolve: {
        root: helpers.root('src'),
        extensions: ['', '.js', '.ts'],
        modulesDirectories: [
            'node_modules'
        ]
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular'),
                    helpers.root('node_modules/systemjs'),
                    helpers.root('node_modules/@ngrx')
                ]
            }

        ],
        loaders: [
            {
                test: /\.(scss|css)$/,
                include: [ 
                    helpers.root('src', 'assets', 'stylesheets'),
                    helpers.root('node_modules')
                ],
                loader: ExtractTextPlugin.extract('style', 'raw!sass')
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'assets', 'stylesheets'),
                loaders: ["raw", "sass"]
            },
            {
                test: /\.ts$/,
                loaders: [ 'awesome-typescript-loader', 'angular2-router-loader', 'angular2-template-loader' ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.html$/,
                loader: 'raw',
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    plugins: [
        // Copy assets
        new CopyWebpackPlugin([
            {
                from: 'src/assets/images',
                to: 'assets/images'
            },
            {
                from: 'src/assets/fonts',
                to: 'assets/fonts'
            }
        ]),
        
        // Extract global css to file
        new ExtractTextPlugin('assets/stylesheets/[name].css', {
            allChunks: false
        }),
        
        // Optimizes something?
        new webpack.optimize.CommonsChunkPlugin({
            name: ['polyfills', 'vendor'].reverse()
        }),
        
        // Generate index.html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.ejs',
        })
    ],
    node: {
        fs: "empty"
    }
};