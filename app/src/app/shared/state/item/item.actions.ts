import { Error } from '../../models';
import { BaseAction, ErrorAction } from '../base';

/**
 * General item actions. All actions takes a namespace to make
 * them reusable all over the applicaton state.
 */
export abstract class ItemAction<T extends string> extends BaseAction<T> { }

export enum ActionTypes {
	SET = 'SET',
	SET_SUCCESS = 'SET_SUCCESS',
	SET_ERROR = 'SET_ERROR',
	SET_ITEM = 'SET_ITEM',
	SET_NEW = 'SET_NEW',

	NAVIGATE_TO_NEW = 'NAVIGATE_TO_NEW',
	NAVIGATE = 'NAVIGATE',

	CREATE = 'CREATE',
	CREATE_SUCCESS = 'CREATE_SUCCESS',
	CREATE_ERROR = 'CREATE_ERROR',

	UPDATE = 'UPDATE',
	UPDATE_SUCCESS = 'UPDATE_SUCCESS',
	UPDATE_ERROR = 'UPDATE_ERROR',

	REMOVE = 'REMOVE',
	REMOVE_SUCCESS = 'REMOVE_SUCCESS',
	REMOVE_ERROR = 'REMOVE_ERROR',

	RESET = 'RESET',
	CLEAR = 'CLEAR',
}

/**
 * Set
 */
export class Set extends ItemAction<'SET'> {
	readonly key = ActionTypes.SET;
	
	constructor(public namespace: string, public id: number) { super(); }
}

export class SetSuccess<T> extends ItemAction<'SET_SUCCESS'> {
	readonly key = ActionTypes.SET_SUCCESS;
	
	constructor(public namespace: string, public item: T) { super(); }
}

export class SetError extends ItemAction<'SET_ERROR'> implements ErrorAction {
	readonly key = ActionTypes.SET_ERROR;
	error: Error;
	constructor(public namespace: string) { super(); }
}

export class SetItem<T> extends ItemAction<'SET_ITEM'> {
	readonly key = ActionTypes.SET_ITEM;
	
	constructor(public namespace: string, public item: T) { super(); }
}

export class SetNew<T> extends ItemAction<'SET_NEW'> {
	readonly key = ActionTypes.SET_NEW;

	constructor(public namespace: string, public item?: T) { super(); }
}

/**
 * Navigation
 */
export class NavigateToNew extends ItemAction<'NAVIGATE_TO_NEW'> {
	readonly key = ActionTypes.NAVIGATE_TO_NEW;

	constructor(public namespace: string) { super(); }
}

export class Navigate extends ItemAction<'NAVIGATE'> {
	readonly key = ActionTypes.NAVIGATE;

	constructor(public namespace: string, public id: number) { super(); }
}

/**
 * Create
 */
export class Create<T> extends ItemAction<'CREATE'> {
	readonly key = ActionTypes.CREATE;
	constructor(public namespace: string, public item: T) { super(); }
}

export class CreateSuccess<T> extends ItemAction<'CREATE_SUCCESS'> {
	readonly key = ActionTypes.CREATE_SUCCESS;
	constructor(public namespace: string, public item: T) { super(); }
}

export class CreateError extends ItemAction<'CREATE_ERROR'> implements ErrorAction {
	readonly key = ActionTypes.CREATE_ERROR;
	error: Error;
	constructor(public namespace: string) { super(); }
}

/**
 * Update
 */
export class Update<T> extends ItemAction<'UPDATE'> {
	readonly key = ActionTypes.UPDATE;
	constructor(public namespace: string, public item: T) { super(); }
}

export class UpdateSuccess<T> extends ItemAction<'UPDATE_SUCCESS'> {
	readonly key = ActionTypes.UPDATE_SUCCESS;
	constructor(public namespace: string, public item: T) { super(); }
}

export class UpdateError extends ItemAction<'UPDATE_ERROR'> implements ErrorAction {
	readonly key = ActionTypes.UPDATE_ERROR;
	error: Error;
	constructor(public namespace: string) { super(); }
}

/**
 * Remove
 */
export class Remove extends ItemAction<'REMOVE'> {
	readonly key = ActionTypes.REMOVE;
	constructor(public namespace: string, public item: number) { super(); }
}

export class RemoveSuccess extends ItemAction<'REMOVE_SUCCESS'> {
	readonly key = ActionTypes.REMOVE_SUCCESS;
	constructor(public namespace: string, public success: boolean) { super(); }
}

export class RemoveError extends ItemAction<'REMOVE_ERROR'> implements ErrorAction {
	readonly key = ActionTypes.REMOVE_ERROR;
	error: Error;
	constructor(public namespace: string) { super(); }
}

/**
 * Reset and clear
 */
export class Reset extends ItemAction<'RESET'> {
	readonly key = ActionTypes.RESET;
	constructor(public namespace: string) { super(); }
}

export class Clear extends ItemAction<'CLEAR'> {
	readonly key = ActionTypes.CLEAR;
	constructor(public namespace: string) { super(); }
}


export type Actions<T> =
	Set| SetSuccess<T> | SetError
	| SetItem<T> | SetNew<T>
	| Create<T> | CreateSuccess<T> | CreateError
	| Update<T> | UpdateSuccess<T> | UpdateError
	| Remove | RemoveSuccess | RemoveError
	| Reset
	| Clear;
