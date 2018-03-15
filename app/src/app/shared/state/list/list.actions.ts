import { Error } from '../../models';
import { BaseAction, ErrorAction } from '../base';

export enum ActionTypes {
	LOAD = 'LOAD',
	LOAD_SUCCESS = 'LOAD_SUCCESS',
	LOAD_ERROR = 'LOAD_ERROR',

	ADD = 'ADD',
	UPDATE = 'UPDATE',
	REMOVE = 'REMOVE',
}

/**
 * General list actions. All actions takes a namespace to make
 * them reusable all over the applicaton state.
 */
export abstract class ListAction<T extends string> extends BaseAction<T> { }

export class Load extends ListAction<'LOAD'> {
	readonly key = ActionTypes.LOAD;

	constructor(public namespace: string) { super(); }
}

export class LoadSuccess<T> extends ListAction<'LOAD_SUCCESS'> {
	readonly key = ActionTypes.LOAD_SUCCESS;
	
	constructor(public namespace: string, public list: T[]) { super(); }
}

export class LoadError extends ListAction<'LOAD_ERROR'> implements ErrorAction {
	readonly key = ActionTypes.LOAD_ERROR;
	error: Error;
	constructor(public namespace: string) { super(); }
}

export class Add<T> extends ListAction<'ADD'> {
	readonly key = ActionTypes.ADD;
	
	constructor(public namespace: string, public item: T) { super(); }
}

export class Update<T> extends ListAction<'UPDATE'> {
	readonly key = ActionTypes.UPDATE;
	
	constructor(public namespace: string, public item: T) { super(); }
}

export class Remove extends ListAction<'REMOVE'> {
	readonly key = ActionTypes.REMOVE;
	
	constructor(public namespace: string, public id: number) { super(); }
}

export type Actions<T> =
	Load | LoadSuccess<T> | LoadError
	| Add<T>
	| Update<T>
	| Remove;