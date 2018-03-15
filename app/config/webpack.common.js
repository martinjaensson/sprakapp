// Webpack
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ngTools = require('@ngtools/webpack');

// Helper methods
const helpers = require('./helpers');

/**
 * General configuration used for all webpack builds
 */
module.exports = function (config) {

    return {

        entry: {
            polyfills: './src/polyfills.ts',
            vendor: './src/vendor.ts',
            app: './src/main.ts',
            styles: './src/styles.ts'
        },

        resolve: {
            modules: [
                helpers.root('src'),
                'node_modules'
            ],
            extensions: ['.js', '.ts'],
        },

        module: {

            loaders: [

                (!config.production ?
                    // Typescript transpilation (non-aot)
                    {
                        test: /\.ts$/,
                        loaders: [
                            'awesome-typescript-loader',
                            'angular2-template-loader',
                            'angular2-router-loader'
                        ],
                        exclude: [/\.(spec|e2e)\.ts$/]
                    } :
                    // Angular compilation (aot)
                    {
                        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                        loader: '@ngtools/webpack'
                    }
                ),

                // Theme sass files
                {
                    test: /\.scss$/,
                    include: helpers.root('src', 'assets', 'stylesheets'),
                    loader: ExtractTextPlugin.extract({
                        use: ["css-loader", "sass-loader"]
                    })
                },

                // Component sass
                {
                    test: /\.scss$/,
                    include: helpers.root('src', 'app'),
                    loaders: ["to-string-loader", "css-loader", "sass-loader"]
                },

                // Html handler
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },

                // Files
                {
                    test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader'
                },

                // Linting
                {
                    test: /\.ts$/,
                    enforce: 'pre',
                    exclude: helpers.root('src', 'app', 'shared', 'models', 'dto'),
                    loader: 'tslint-loader',
                    options: {
                        configFile: 'tslint.json',
                        // typeCheck: true // Would be nice to have, but is extremely slow
                    }
                }
            ]

        },

        plugins: [
            // Define config variable
            new webpack.DefinePlugin({
                WEBPACK_ENV: JSON.stringify(config)
            }),

            // AOT
            ...(config.production ? [new ngTools.AngularCompilerPlugin({
                tsConfigPath: 'tsconfig.aot.json',
                entryModule: helpers.root('src/app/app.module#AppModule')
            })] : []),

            // Clean folders
            new CleanWebpackPlugin(['dist', 'build'], {
                root: helpers.root()
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: ['polyfills', 'vendor'].reverse()
            }),

            // Copy web config file for IIS and favicon
            new CopyWebpackPlugin([
                {
                    from: 'src/web.config'
                },
                {
                    from: 'src/favicon.ico'
                }
            ]),

            // Extract global css to file
            new ExtractTextPlugin({
                filename: 'assets/stylesheets/[name].css',
                allChunks: false
            }),

            // Generate index.html
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.ejs',
            }),

            // Suppresses some error
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)(@angular|esm5)/,
                helpers.root('src')
            ),

        ]
    }
};