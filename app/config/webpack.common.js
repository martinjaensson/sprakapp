const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AppCachePlugin = require('appcache-webpack-plugin');
const ngtools = require('@ngtools/webpack');

const path = require('path');
const helpers = require('./helpers');

module.exports = {
    
    // Entry psoints
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts',
        'vendor': './src/vendor.ts',
        'styles': './src/styles.ts'
    },
    
    // Output information
    output: {
        path: helpers.root('dist'),
        filename: '[name].[chunkhash].js',
    },
    
    resolve: {
        // root: helpers.root('src'),
        extensions: ['.js', '.ts'],
        modules: [ helpers.root('node_modules') ]
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                use: 'source-map-loader',
                exclude: [
                    // these packages have problems with their sourcemaps
                    helpers.root('node_modules/rxjs'),
                    helpers.root('node_modules/@angular'),
                    helpers.root('node_modules/systemjs'),
                    helpers.root('node_modules/@ngrx'),
                    helpers.root('node_modules/primeng')
                ]
            },
            {
                test: /\.(scss|css)$/,
                include: [ 
                    helpers.root('src', 'assets', 'stylesheets')
                ],
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'raw-loader!sass-loader' })
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'assets', 'stylesheets'),
                use: ["raw-loader", "sass-loader"]
            },
            { 
                test: /\.css$/, 
                include: helpers.root('node_modules'),
                use: 'raw-loader' 
            },
            {
                test: /\.ts$/,
                use: [ 'awesome-typescript-loader', 'angular2-router-loader', 'angular2-template-loader' ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {
                test: /\.html$/,
                use: 'raw-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },

    plugins: [
        // new webpack.DllReferencePlugin({
		// 	context: "./dll",
		// 	manifest: "./dll/vendor-manifest.json" // eslint-disable-line
		// }),

         // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'), // location of your src
            {}
        ),

        // Clean distribution folder
        new CleanWebpackPlugin(['dist'], {
            root: helpers.root()
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
                from: 'node_modules/font-awesome/fonts',
                to: 'assets/fonts'
            },
            { 
                from: 'src/web.config'
            },
            {
                from: 'node_modules/leaflet/dist/images',
                to: 'assets/stylesheets/images'
            },
        ]),
        
        // Provide global libraries
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            "Tether": 'tether',
            "window.Tether": 'tether',
            "L": 'leaflet'
        }),
        
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
            template: 'src/index.html'
        })
    ],

    node: {
        fs: "empty"
    }
};