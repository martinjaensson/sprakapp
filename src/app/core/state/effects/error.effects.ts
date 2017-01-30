import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MdDialog } from '@angular/material';
import { Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { ErrorDialogComponent } from '../../error/dialog/error-dialog.component';

import { BaseEffects } from './base.effects';
import { AppState } from '../';

import * as errorActions from '../actions/error.actions';

@Injectable()
export class ErrorEffects extends BaseEffects {

    constructor(private _actions$: Actions,
                private _router: Router,
                private _mdDialog: MdDialog) {
        super();
    }

    /**
     * Handles error by showing error page
     */
    @Effect()
    handleWithPage$: Observable<Action> = this._actions$
        .ofType(errorActions.ActionTypes.PAGE)
        .do(action => this._router.navigate([ '/error' ]))
        .map(action => new errorActions.Handled());

    /**
     * Handles error by showing error page
     */
    @Effect()
    handleWithDialog$: Observable<Action> = this._actions$
        .ofType(errorActions.ActionTypes.DIALOG)
        .do(action => this._mdDialog.open(ErrorDialogComponent, { width: '350px' }))
        .map(action => new errorActions.Handled());

    /**
     * Handles error by logging user out and showing a message
     */
    @Effect()
    handleWithLogout$: Observable<Action> = this._actions$
        .ofType(errorActions.ActionTypes.LOGOUT)
        .do(action => this._router.navigate([ '/login' ]))
        .map(action => new errorActions.Handled());

}