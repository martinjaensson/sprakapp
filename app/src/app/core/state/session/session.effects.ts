import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';

import { handleError, type } from '../../../shared/state/utils';

import { AppState } from '../app.model';
import { LoginResource, UserResource } from '../../resources';
import { AuthenticationService } from '../../services';

import * as sessionActions from './session.actions';
import { session as namespace } from '../namespaces';

import { environment } from '../../../../config';

@Injectable()
export class SessionEffects {

	constructor(private actions$: Actions,
		private router: Router,
		private userResource: UserResource,
		private authenticationService: AuthenticationService) { }

	/**
	 * Initialization
	 */
	@Effect()
	initialize$: Observable<Action> = this.actions$.pipe(
		ofType(type(namespace, sessionActions.ActionTypes.INITIALIZE)),
		switchMap(_ => this.authenticationService.isAuthenticated()),
		map(isAuthenticated => {
			if (isAuthenticated)
				return new sessionActions.SetUser();
			return new sessionActions.SetUserNull();
		})
	);

	/**
	 * User
	 */
	@Effect()
	setUser$: Observable<Action> = this.actions$.pipe(
		ofType(type(namespace, sessionActions.ActionTypes.SET_USER)),
		switchMap(_ => {
			return this.userResource.getAuthenticated().pipe(
				map(user => new sessionActions.SetUserSuccess(user)),
				catchError(handleError(new sessionActions.SetUserError()))
			);
		})
	);
}