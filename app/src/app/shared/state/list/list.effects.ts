import { Action } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, filter, withLatestFrom, catchError } from 'rxjs/operators';

import { type, handleError } from '../utils';

import * as listActions from './list.actions';
import { ItemState } from '../item';

/**
 * Contains general effect functionality for lists. 
 */

export function load<T>(namespace: string, actions$: Actions, resourceFn: () => Observable<T[]>): Observable<Action> {
	return actions$.pipe(
		ofType(type(namespace, listActions.ActionTypes.LOAD)),
		switchMap(_ => {
			return resourceFn().pipe(
				map(list => new listActions.LoadSuccess(namespace, list)),
				catchError(handleError(new listActions.LoadError(namespace)))
			);
		})
	);
}

export function loadByItem<T>(namespace: string, actions$: Actions, state$: Observable<ItemState<any>>, 
		resourceFn: (id: number) => Observable<T[]>): Observable<Action> {
	return actions$.pipe(
		ofType(type(namespace, listActions.ActionTypes.LOAD)),
		withLatestFrom(state$),
		filter(([_, item]) => !!item.item),
		map(([_, item]) => item.item.id),
		switchMap(id => {
			return resourceFn(id).pipe(
				map(list => new listActions.LoadSuccess(namespace, list)),
				catchError(handleError(new listActions.LoadError(namespace)))
			);
		})
	);
		
}