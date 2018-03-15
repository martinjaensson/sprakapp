/**
 * Karma test setup, meant to run on VSTS. The file: './src/tests.js' contains require calls 
 * that find all .spec.ts files in src/. Webpack is then used as preprocessor
 * to compile the ts-files. 
 * 
 * JUnit reporter is used to generate test run results in XML, which are used by the build system.
 */

var webpackConfig = require('./webpack.test');

module.exports = function (config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine'],

        client: {
            clearContext: true
        },

        files: [
            { pattern: '../src/tests.js', watched: false }
        ],

        preprocessors: {
            '../src/tests.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        reporters: ['progress',  'junit'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['PhantomJS'],
        singleRun: true,
        browserNoActivityTimeout: 30000
    };

    config.set(_config);
};