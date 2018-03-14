import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, SessionState } from '../state';
import { LoginRequest } from '../models';

import * as sessionActions from '../state/actions/session.actions';

@Injectable()
export class SessionService {

    private _sessionState$: Observable<SessionState>;

    constructor(private _store: Store<AppState>) { 
        this._sessionState$ = this._store.select(state => state.session);

        // Initialize session
        this._store.dispatch(new sessionActions.Initialize());
    }  

    get(): Observable<SessionState> {
        return this._sessionState$;
    }

    login(loginRequest: LoginRequest): void {
        this._store.dispatch(new sessionActions.Login(loginRequest));
    }

    isAuthenticated(): Observable<boolean> {
        return this._sessionState$
            .filter(sessionState => !!sessionState.initialized)
            .map(sessionState => !!sessionState.user);
    }

    logout(){
        this._store.dispatch(new sessionActions.Logout());
    }
}