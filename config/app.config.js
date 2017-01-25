/**
 * Configuration for webpack build.
 * 
 * These exports should follow the interface placed in src/config.ts.
 */

var api = {
    prod: {
        url: 'https://crmapi.imatech.com',
        tokenName: 'app-token'
    },
    dev: {
        url: 'https://crmapi.imatech.com',
        tokenName: 'app-token'
    },
    local: {
        url: 'http://localhost:61665',
        tokenName: 'app-token'
    }
};

var common = {
    version: '0.1.0',
    api: {
        tokenName: 'ex-token'
    }
};

module.exports = {
    local: Object.assign(common, {
        production: false,
        api: {
            url: 'http://localhost:61665'
        }
    }),
    dev: Object.assign(common, {
        production: false
    }),
    test: Object.assign(common, {
        production: true
    }),
    prod: Object.assign(common, {
        production: true
    }),
};