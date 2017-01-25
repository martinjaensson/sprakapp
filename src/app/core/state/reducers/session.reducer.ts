import { Action } from '@ngrx/store';

import { SessionState } from '../';

import { User } from '../../models';
import * as sessionActions from '../actions/session.actions';

let initialState: SessionState = {
    initialized: false,
    user: null
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
        
        default:
            return state;
    }
}