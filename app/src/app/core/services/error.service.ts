import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, ErrorState } from '../state/models';
import * as errorActions from '../state/actions/error.actions';

@Injectable()
export class ErrorService {

    private _errorState$: Observable<ErrorState>;

    constructor(private _store: Store<AppState>) { 
        this._errorState$ = this._store.select(state => state.error);
    }

    get(): Observable<ErrorState> {
        return this._errorState$;
    }

}