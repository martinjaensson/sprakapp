/**
 * Configuration interfaces
 */
interface EnvironmentConfig {
	version: string;
	production: boolean;
	api: {
		url: string;
	};
	auth: {
		authority: string;
		clientId: string;
		redirectUrl: string;
		logoutRedirectUrl: string;
		scope: string;
	};
}

interface StateConfig {
	errorNamespace: string;
}


/**
 * Actual app configuration
 */
declare var WEBPACK_ENV: any;
export const environment: EnvironmentConfig = WEBPACK_ENV; // Gets configuration from webpack build

export const state: StateConfig = {
	errorNamespace: 'error'
};