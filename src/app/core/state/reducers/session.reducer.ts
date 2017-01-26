import { Action } from '@ngrx/store';

import { SessionState } from '../';

import { User } from '../../models';
import * as sessionActions from '../actions/session.actions';

let initialState: SessionState = {
    initialized: false,
    user: null,
    loginError: null
};

export function reducer(state: SessionState = initialState, action: Action): SessionState {

    switch (action.type) {

        case sessionActions.ActionTypes.SET_SUCCESS: {
            return Object.assign({}, state, {
                user: action.payload,
                initialized: true
            });
        }

        case sessionActions.ActionTypes.SET_NULL: 
        case sessionActions.ActionTypes.SET_ERROR: {
            return Object.assign({}, state, {
                initialized: true
            });
        }

        /**
         * Login
         */
        case sessionActions.ActionTypes.LOGIN: {
            return Object.assign({}, state, {
                loginError: null
            });
        }

        case sessionActions.ActionTypes.LOGIN_ERROR: {
            return Object.assign({}, state, {
                loginError: action.payload
            });
        }
        
        default:
            return state;
    }
}