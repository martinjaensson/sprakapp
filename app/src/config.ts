declare var WEBPACK_CONFIG: any;

interface Config {
    api_url: string;
    tokenRefreshInterval: number;
    prodMode: boolean;
    dateFormat: string;
    tokenName: string;
}

export const CONFIG: Config = WEBPACK_CONFIG;