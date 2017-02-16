import { Action } from '@ngrx/store';

import { ErrorState } from '../';

import { User } from '../../models';
import * as errorActions from '../actions/error.actions';

let initialState: ErrorState = {
    error: null
};

export function reducer(state: ErrorState = initialState, action: Action): ErrorState {

    switch (action.type) {

        case errorActions.ActionTypes.DIALOG:
        case errorActions.ActionTypes.LOGOUT:
        case errorActions.ActionTypes.PAGE: {
            return Object.assign({}, state, {
                error: action.payload
            });
        }
        
        default:
            return state;
    }
}