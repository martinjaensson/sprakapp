/**
 * Configuration for webpack build.
 * 
 * These exports should follow the interface placed in src/config.ts.
 */

var common = {
    version: '0.1.0',
    api: {
        tokenName: 'ex-token'
    }
};

module.exports = {
    local: Object.assign({}, common, {
        production: false,
        api: Object.assign({}, common.api, {
            url: 'http://localhost:49887'
        })
    }),
    dev: Object.assign({}, common, {
        production: false
    }),
    test: Object.assign({}, common, {
        production: true
    }),
    prod: Object.assign({}, common, {
        production: true
    }),
};