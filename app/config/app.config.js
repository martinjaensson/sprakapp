/**
 * Configuration for webpack build.
 * 
 * These exports should follow the interface placed in src/config.ts.
 */

module.exports = {
    local: {
        production: false,
        api: {
            url: 'http://localhost:61595'
        },
        auth: {
            authority: 'https://localhost:44316/',
            clientId: 'exApp',
            redirectUrl: 'http://localhost:8080/authentication/redirect',
            logoutRedirectUrl: 'http://localhost:8080/authentication/logout/redirect',
            scope: 'openid exApi'
        }
    },
    dev: {
        production: false
    },
    test: {
        production: true
    },
    prod: {
        production: true
    },
};