declare var WEBPACK_CONFIG: any;

interface Config {
    version: string,

    production: boolean,

    cordova: boolean,
    platform: "ios" | "android",

    api: {
        url: string,
        tokenName: string
    },
}

export const CONFIG: Config = Object.assign(WEBPACK_CONFIG, {
    
});