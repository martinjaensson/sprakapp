import { type } from '../../../shared/state/utils';

import { LayoutState } from './layout.model';
import * as layoutActions from './layout.actions';

import { layout as namespace } from '../namespaces';

export const initialState: LayoutState = {
	menuVisible: false
};

export function reducer(state: LayoutState, action: layoutActions.Actions): LayoutState {

	switch (action.type) {

		case type(namespace, layoutActions.ActionTypes.TOGGLE_MENU): {
			return {
				...state,
				menuVisible: !state.menuVisible
			};
		}

		default:
			return state;

	}

}