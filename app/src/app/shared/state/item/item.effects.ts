import { Action } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, withLatestFrom, catchError } from 'rxjs/operators';

import { type, handleError } from '../utils';
import * as list from '../list';

import { ItemState } from './item.model';
import * as itemActions from './item.actions';

/**
 * Contains general effect functionality for items. 
 */

/**
 * Item
 */
export function set<T>(namespace: string, actions$: Actions, resourceFn: (id: number) => Observable<T>): Observable<Action> {
	return actions$.pipe(
		ofType(type(namespace, itemActions.ActionTypes.SET)),
		map((action: itemActions.Set) => action.id),
		switchMap(id => {
			return resourceFn(id).pipe(
				map(item => new itemActions.SetSuccess(namespace, item)),
				catchError(handleError(new itemActions.SetError(namespace)))
			);
		})
	);
}

export function create<T>(namespace: string, actions$: Actions, 
		resourceFn: (item: T) => Observable<T>, successMessage?: string, redirectBaseUrl?: string): Observable<Action> {
	return actions$.pipe(
		ofType(type(namespace, itemActions.ActionTypes.CREATE)),
		map((action: itemActions.Create<T>) => action.item),
		switchMap(item => handleCreatedItem(namespace, () => resourceFn(item)))
	);
}

export function createForItem<T>(namespace: string, actions$: Actions, resourceFn: (id: number, item: T) => Observable<T>, 
		state$: Observable<ItemState<any>>, successMessage?: string, redirectBaseUrl?: string): Observable<Action> {
	return actions$.pipe(
		ofType(type(namespace, itemActions.ActionTypes.CREATE)),
		map((action: itemActions.Create<T>) => action.item),
		withLatestFrom(state$),
		switchMap(([item, itemState]) => 
			handleCreatedItem(namespace, () => resourceFn(itemState.item.id, item)))
	);
}

function handleCreatedItem<T>(namespace: string, resourceFn: () => Observable<T>): Observable<Action> {
	return resourceFn().pipe(
		switchMap(createdItem => {
			let actions: Action[] = [ new itemActions.CreateSuccess(namespace, createdItem) ];
			return Observable.from(actions);
		}),
		catchError(handleError(new itemActions.CreateError(namespace)))
	);
}

export function update<T>(namespace: string, actions$: Actions, 
		resourceFn: (item: T) => Observable<T>, successMessage?: string): Observable<Action> {
	return actions$.pipe(
		ofType(type(namespace, itemActions.ActionTypes.UPDATE)),
		map((action: itemActions.Update<T>) => action.item),
		switchMap(item => handleUpdatedItem(namespace, () => resourceFn(item)))
	);
}

export function updateForItem<T>(namespace: string, actions$: Actions, resourceFn: (id: number, item: T) => Observable<T>, 
		state$: Observable<ItemState<any>>): Observable<Action> {
	return actions$.pipe(
		ofType(type(namespace, itemActions.ActionTypes.UPDATE)),
		map((action: itemActions.Update<T>) => action.item),
		withLatestFrom(state$),
		switchMap(([item, itemState]) => 
			handleUpdatedItem(namespace, () => resourceFn(itemState.item.id, item)))
	);
}

function handleUpdatedItem<T>(namespace: string, resourceFn: () => Observable<T>): Observable<Action> {
	return resourceFn().pipe(
		switchMap(updatedItem => {
			let actions: Action[] = [ new itemActions.UpdateSuccess(namespace, updatedItem) ];
			return Observable.from(actions);
		}),
		catchError(handleError(new itemActions.UpdateError(namespace)))
	);
}