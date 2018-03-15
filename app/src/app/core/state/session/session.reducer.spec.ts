import { User, LoginRequest } from '../../../shared/models';

import { SessionState } from './session.model';
import * as sessionActions from './/session.actions';
import * as sessionReducer from './session.reducer';

let initialState: SessionState;

describe('Session reducer', () => {

	beforeEach(() => {
		initialState = sessionReducer.initialState;
	});

	it('SetUserSuccess should set user and initialized', () => {
		let user = new User();
		user.name = 'test';

		let res = sessionReducer.reducer(initialState, new sessionActions.SetUserSuccess(user));
		expect(res.initialized).toBeTruthy();
		expect(res.user.name).toBe('test');
	});

	it('SetUserError should set initialized to true', () => {
		expect(initialState.initialized).toBe(false);
		let res = sessionReducer.reducer(initialState, new sessionActions.SetUserError());
		expect(res.initialized).toBe(true);
	});
});