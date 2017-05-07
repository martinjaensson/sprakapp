// Webpack
const webpack = require('webpack');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Helper methods
const helpers = require('./helpers');

// AotPlugin
const ngtools = require('@ngtools/webpack');

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
        modules:[
            helpers.root('src'),
            'node_modules'
        ],
        extensions: ['.js', '.ts'],
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular'),
                    helpers.root('node_modules/systemjs'),
                    helpers.root('node_modules/@ngrx')
                ]
            },
            {
                test: /\.(scss|css)$/,
                include: [
                    helpers.root('src', 'assets', 'stylesheets'),
                    // helpers.root('node_modules')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: 'raw-loader!sass-loader'
                })
            },
            { test: /\.scss$/, exclude: helpers.root('src', 'assets', 'stylesheets'), loaders: [ 'raw-loader', 'sass-loader' ] },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.ts$/, exclude: [/\.(spec|e2e)\.ts$/], loader: '@ngtools/webpack' },
            { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=assets/[name].[hash].[ext]' },
        ]
    },
    plugins: [
        new ngtools.AotPlugin({
            tsConfigPath: './tsconfig.aot.json',
            entryModule: 'src/app/app.module#AppModule'
        }),

        // Copy assets
        new CopyWebpackPlugin([
            {
                from: 'src/assets/images',
                to: 'assets/images'
            },
            {
                from: 'src/assets/fonts',
                to: 'assets/fonts'
            },
            {
                from: 'node_modules/material-design-icons/iconfont',
                to: 'assets/fonts'
            }
        ]),

        // Extract global css to file
        new ExtractTextPlugin({
            filename: 'assets/stylesheets/[name].css', 
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
        }),
        
        // Suppresses some error
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        )
    ],
    node: {
        fs: "empty"
    }
};