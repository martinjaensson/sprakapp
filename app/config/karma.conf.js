/**
 * Karma test setup. The file: './src/tests.js' contains require calls 
 * that finds all .spec.ts files in src/. Webpack is then used as preprocessor
 * to compile the ts-files. 
 * 
 * For nice, fast console messages from testruns use the mocha-reporter and PhantomJS. 
 * For an even clearer view use Chrome and karma-jasmine-html-reporter, which is slower though.
 * For automatically running tests on change: 
 *      set watched: true on files[]
 *      set autowatch: true
 *      set singlerun: false
 *      set client.clearContext: false (if Chrome)
 */

var webpackConfig = require('./webpack.test');
var watchMode = true;

module.exports = function (config) {
    var _config = {
        basePath: '',

        frameworks: ['jasmine'],

        client: {
            clearContext: true // false leaves Jasmine Spec Runner output visible in browser
        },

        files: [
            { pattern: './src/tests.js', watched: watchMode }
        ],

        preprocessors: {
            './src/tests.js': ['webpack', 'sourcemap']
        },

        webpack: webpackConfig,

        webpackMiddleware: {
            stats: 'errors-only'
        },

        webpackServer: {
            noInfo: true
        },

        mochaReporter: {
            maxLogLines: 5,
            colors:{
                error: 'white'
            },
        },

        reporters: /*['progress', 'kjhtml']*/  ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: watchMode,
        browsers: ['PhantomJS'],
        singleRun: !watchMode,
        browserNoActivityTimeout: 30000
    };

    config.set(_config);
};