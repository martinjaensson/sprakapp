import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { BaseEffects } from './base.effects';
import { AppState } from '../';

import { LoginResource } from '../../resources';

import * as sessionActions from '../actions/session.actions';

@Injectable()
export class SessionEffects extends BaseEffects {

    constructor(private _actions$: Actions,
                private _loginResource: LoginResource) {
        super();
    }

    /**
     * Initialize session by checking if there is
     * an authenticated user
     */
    @Effect()
    initialize$: Observable<Action> = this._actions$
        .ofType(sessionActions.ActionTypes.INITIALIZE)
        .map(action => {
            // TODO: Implement actual checking
            return new sessionActions.SetNull();
        });

    /**
     * Login against API
     */
    @Effect()
    login$: Observable<Action> = this._actions$
        .ofType(sessionActions.ActionTypes.LOGIN)
        .map(toPayload)
        .switchMap(loginRequest => {
            return this._loginResource.login(loginRequest)
                .map(loginResponse => new sessionActions.LoginSuccess())
                .catch(super.handleError(new sessionActions.LoginError()));
        });

}