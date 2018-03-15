import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

import { environment } from '../../../../config';
import { handleError, type } from '../../../shared/state/utils';

import { AuthenticationService } from '../../services';
import { AppState } from '../app.model';
import { authentication as namespace } from '../namespaces';

import * as session from '../session';
import * as authentication from './authentication.actions';

@Injectable()
export class AuthenticationEffects {

	constructor(private actions$: Actions,
		private router: Router,
		private authenticationService: AuthenticationService) {
	}

	@Effect()
	authenticate$: Observable<Action> = this.actions$.pipe(
		ofType(type(namespace, authentication.ActionTypes.AUTHENTICATE)),
		map((action: authentication.Authenticate) => action.provider),
		switchMap(provider => this.authenticationService.authenticate(provider).pipe(
			map(_ => new authentication.AuthenticateSuccess()),
			catchError((err, caught) => of(new authentication.AuthenticateCancel()))
		))
	);

	@Effect()
	handleAuthenticationSuccess$$: Observable<Action> = this.actions$.pipe(
		ofType(type(namespace, authentication.ActionTypes.AUTHENTICATE_SUCCESS)),
		tap(_ => this.router.navigate(['/'])),
		map(_ => new session.SetUser())
	);

	@Effect()
	logout$: Observable<Action> = this.actions$.pipe(
		ofType(type(namespace, authentication.ActionTypes.LOGOUT)),
		switchMap(provider => this.authenticationService.logout().pipe(
			map(_ => new authentication.LogoutSuccess())
		))
	);
}