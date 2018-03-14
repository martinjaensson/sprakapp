import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { BaseEffects } from './base.effects';
import { AppState } from '../';

import { LoginResource, UserResource } from '../../resources';

import * as sessionActions from '../actions/session.actions';

import { CONFIG } from '../../../../config';

@Injectable()
export class SessionEffects extends BaseEffects {

    constructor(private _actions$: Actions,
                private _router: Router,
                private _loginResource: LoginResource,
                private _userResource: UserResource) {
        super();
    }

    /****************************************************************
     * Initialization
     ***************************************************************/

    /**
     * Initialize session by checking if there is
     * an authenticated user
     */
    @Effect()
    initialize$: Observable<Action> = this._actions$
        .ofType(sessionActions.ActionTypes.INITIALIZE)
        .map(action => {
            if (localStorage.getItem(CONFIG.tokenName))
                return new sessionActions.Set();
            else
                return new sessionActions.SetNull();
        });

    /**
     * Attempts to set current session data by fetching it from
     * the API
     */
    @Effect()
    set$: Observable<Action> = this._actions$
        .ofType(sessionActions.ActionTypes.SET)
        .switchMap(action => {
            return this._userResource.getAuthenticated()
                .map(user => new sessionActions.SetSuccess(user))
                .catch(super.handleError(new sessionActions.SetError()))
        });

    

    /****************************************************************
     * Login
     ***************************************************************/

    /**
     * Login against API
     */
    @Effect()
    login$: Observable<Action> = this._actions$
        .ofType(sessionActions.ActionTypes.LOGIN)
        .map(toPayload)
        .switchMap(loginRequest => {
            return this._loginResource.login(loginRequest)
                .map(loginResponse => new sessionActions.LoginSuccess(loginResponse.token))
                .catch(super.handleError(new sessionActions.LoginError()));
        });

    /**
     * Saves token to local storage and redirects to login page
     */
    @Effect()
    handleLoginSuccess$: Observable<Action> = this._actions$
        .ofType(sessionActions.ActionTypes.LOGIN_SUCCESS)
        .map(toPayload)
        .do(token => localStorage.setItem(CONFIG.tokenName, token))
        .do(token => this._router.navigate(['/']))
        .map(action => new sessionActions.Set());

    @Effect()
    logout$: Observable<Action> = this._actions$
        .ofType(sessionActions.ActionTypes.LOGOUT)
        .do(action => localStorage.removeItem(CONFIG.tokenName))
        .do(action => this._router.navigate([ '/login' ]))
        .do(action => window.location.reload())
        .map(action => new sessionActions.LogoutOK());

}