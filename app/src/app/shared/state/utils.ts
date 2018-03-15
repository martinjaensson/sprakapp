import { ActionReducer } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { from } from 'rxjs/observable/from';

import * as errorActions from './error';

import { BaseAction, ErrorAction } from './base';

/**
 * Used to ensure that all actions have a unique type.
 */
let typeCache: { [label: string]: boolean } = {};
function validateType<T>(label: T | ''): T {
	if (typeCache[<string>label]) {
		throw new Error(`Action type "${label}" is not unqiue"`);
	}

	typeCache[<string>label] = true;

	return <T>label;
}

/**
 * Combines a module name and a state name into a namespace
 */
export function createNamespace(moduleName: string, name: string): string {
	return `${moduleName} | ${name}`;
}

/**
 * Combines a namespace and a key into an action type.
 */
export function type<T extends string>(namespace: string, key: T): T {
	return <T>`[${namespace}] ${key}`;
}


/**
 * Handles errors in effects by mapping to specific error action and
 * a general handle action. The specific error handling is then up to
 * that part of the application while the general error action is
 * handled by the core error state.
 */
export function handleError(specificErrorAction: ErrorAction): (err: any, caught: Observable<any>) => Observable<Action> {
	return (e: any, caught: Observable<any>) => {

		specificErrorAction.error = e;

		let actions: Action[] = [
			specificErrorAction,
			new errorActions.Handle(e)
		];

		return from(actions);
	};
}

