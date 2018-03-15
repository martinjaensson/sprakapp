import { Error, AuthenticationProvider } from '../../../shared/models';
import { BaseAction, ErrorAction } from '../../../shared/state/base';

import { authentication as namespace } from '../namespaces';

export enum ActionTypes {
	AUTHENTICATE = 'AUTHENTICATE',
	AUTHENTICATE_CANCEL = 'AUTHENTICATE_CANCEL',
	AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS',
	LOGOUT = 'LOGOUT',
	LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
}

abstract class AuthenticationAction<T extends string> extends BaseAction<T> {
	readonly namespace = namespace;
} 

export class Authenticate extends AuthenticationAction<'AUTHENTICATE'> {
	readonly key = ActionTypes.AUTHENTICATE;

	constructor(public provider: AuthenticationProvider) { super(); }
}

export class AuthenticateCancel extends AuthenticationAction<'AUTHENTICATE_CANCEL'> {
	readonly key = ActionTypes.AUTHENTICATE_CANCEL;
}

export class AuthenticateSuccess extends AuthenticationAction<'AUTHENTICATE_SUCCESS'> {
	readonly key = ActionTypes.AUTHENTICATE_SUCCESS;
}

export class Logout extends AuthenticationAction<'LOGOUT'> {
	readonly key = ActionTypes.LOGOUT;
}

export class LogoutSuccess extends AuthenticationAction<'LOGOUT_SUCCESS'> {
	readonly key = ActionTypes.LOGOUT_SUCCESS;
}

export type Actions = 
	Authenticate | AuthenticateSuccess;