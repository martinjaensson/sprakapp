import { type } from '../../../shared/state/utils';

import { SessionState } from './session.model';
import * as sessionActions from './session.actions';

import { session as namespace } from '../namespaces';

export const initialState: SessionState = {
	initialized: false,
	user: null
};

export function reducer(state: SessionState, action: sessionActions.Actions): SessionState {

	switch (action.type) {

		case type(namespace, sessionActions.ActionTypes.SET_USER_NULL):
		case type(namespace, sessionActions.ActionTypes.SET_USER_ERROR): {
			return {
				...state,
				initialized: true
			};
		}

		case type(namespace, sessionActions.ActionTypes.SET_USER_SUCCESS): {
			return {
				...state,
				user: action.user,
				initialized: true
			};
		}

		default:
			return state;

	}

}