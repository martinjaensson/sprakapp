import { ActionReducer } from '@ngrx/store';

import { type } from '../utils';

import * as listActions from './list.actions';
import { ListState } from './list.model';

/**
 * Handles creation of list reducers.
 */

export const initialState: ListState<any> = {
	list: null,
	loading: false
};

export function handleAction<T>(namespace: string, state: ListState<T>, action: listActions.Actions<T>): ListState<T> {

	switch (action.type) {

		case type(namespace, listActions.ActionTypes.LOAD):
			return {
				...state,
				loading: true
			};

		case type(namespace, listActions.ActionTypes.LOAD_SUCCESS):
			return {
				...state,
				loading: false,
				list: action.list
			};

		case type(namespace, listActions.ActionTypes.LOAD_ERROR):
			return {
				...state,
				loading: false
			};

		default:
			return state;

	}
}