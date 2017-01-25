import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Rx';

import { BaseEffects } from './base.effects';
import { AppState } from '../';

import * as sessionActions from '../actions/session.actions';

@Injectable()
export class SessionEffects extends BaseEffects {

    constructor(private _actions$: Actions,
                private _store: Store<AppState>) {
        super();
    }

}