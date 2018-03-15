import { ActionReducer } from '@ngrx/store';

import { type } from '../utils';

import { ItemState } from './item.model';
import * as itemActions from './item.actions';

/**
 * Handles creation of item reducers.
 */

export const initialState: ItemState<any> = {
	item: null,
	loading: false
};

export function handleAction<T>(namespace: string, state: ItemState<T>, action: itemActions.Actions<T>): ItemState<T> {

	switch (action.type) {

		case type(namespace, itemActions.ActionTypes.SET):
			return {
				...state,
				loading: true
			};

		case type(namespace, itemActions.ActionTypes.SET_SUCCESS):
			return {
				...state,
				loading: false,
				item: action.item
			};

		case type(namespace, itemActions.ActionTypes.SET_ERROR):
			return {
				...state,
				loading: false
			};

		case type(namespace, itemActions.ActionTypes.SET_ITEM):
			return { ...state, 
				loading: false,
				item: action.item
			};

		case type(namespace, itemActions.ActionTypes.SET_NEW):
			return { ...state,
				loading: false,
				item: action.item || <T>{}
			};

		case type(namespace, itemActions.ActionTypes.RESET):
			return { ...state, 
				item: { ...(<any>state.item) } 
			};

		case type(namespace, itemActions.ActionTypes.CREATE):
			return { ...state,
				item: { ...<any>action.item, id: 'temp' }
			};
		case type(namespace, itemActions.ActionTypes.CREATE_SUCCESS):
			return { ...state,
				item: action.item
			};

		case type(namespace, itemActions.ActionTypes.UPDATE):
		case type(namespace, itemActions.ActionTypes.UPDATE_SUCCESS):
			return { ...state,
				item: action.item
			};

		case type(namespace, itemActions.ActionTypes.CLEAR):
			return { ...state, 
				item: null
			};

		default:
			return state;

	}
}