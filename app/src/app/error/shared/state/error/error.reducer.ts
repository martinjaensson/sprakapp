import { type } from '../../../../shared/state/utils';

import { Error } from '../../../../shared/models';
import { Actions, ActionTypes } from '../../../../shared/state/error';

import { state as stateConfig } from '../../../../../config';

export const initialState: Error = null;

export function reducer(state: Error, action: Actions): Error {

	switch (action.type) {

		case type(stateConfig.errorNamespace, ActionTypes.HANDLE): {
			return action.error;
		}

		default:
			return state;
	}

}