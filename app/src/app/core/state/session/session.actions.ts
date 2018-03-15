import { BaseAction, ErrorAction } from '../../../shared/state/base';
import { User, LoginRequest, Error } from '../../../shared/models';

import { session as namespace } from '../namespaces';

export enum ActionTypes {
	INITIALIZE = 'INITIALIZE',

	SET_USER = 'SET_USER',
	SET_USER_NULL = 'SET_USER_NULL',
	SET_USER_SUCCESS = 'SET_USER_SUCCESS',
	SET_USER_ERROR = 'SET_USER_ERROR'
}

abstract class SessionAction<T extends string> extends BaseAction<T> {
	readonly namespace = namespace;
}

/**
 * Initialize
 */
export class Initialize extends SessionAction<'INITIALIZE'> {
	readonly key = ActionTypes.INITIALIZE;
}

/**
 * User
 */
export class SetUser extends SessionAction<'SET_USER'> {
	readonly key = ActionTypes.SET_USER;
}

export class SetUserNull extends SessionAction<'SET_USER_NULL'> {
	readonly key = ActionTypes.SET_USER_NULL;
}

export class SetUserSuccess extends SessionAction<'SET_USER_SUCCESS'> {
	readonly key = ActionTypes.SET_USER_SUCCESS;

	constructor(public user: User) { super(); }
}

export class SetUserError extends SessionAction<'SET_USER_ERROR'> implements ErrorAction {
	readonly key = ActionTypes.SET_USER_ERROR;
	error: Error;
}



export type Actions =
	Initialize | 
	SetUser | SetUserNull | SetUserSuccess | SetUserError;