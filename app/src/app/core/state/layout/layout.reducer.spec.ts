import { User, LoginRequest } from '../../../shared/models';

import { LayoutState } from './layout.model';
import * as layoutActions from './layout.actions';
import * as layoutReducer from './layout.reducer';

let initialState: LayoutState;

describe('Layout reducer', () => {

	beforeEach(() => {
		initialState = layoutReducer.initialState;
	});

	it('ToggleMenu should change visibility of menu', () => {
		expect(initialState.menuVisible).toBeFalsy();
		let state = layoutReducer.reducer(initialState, new layoutActions.ToggleMenu());
		expect(state.menuVisible).toBeTruthy();
		state = layoutReducer.reducer(state, new layoutActions.ToggleMenu());
		expect(state.menuVisible).toBeFalsy();
	});

});