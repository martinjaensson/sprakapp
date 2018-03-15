import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';

import { Error } from '../../../../shared/models';
import { type } from '../../../../shared/state/utils';
import * as error from '../../../../shared/state/error';

import { ErrorDialogComponent } from '../../../dialog/error-dialog.component';

import { state } from '../../../../../config';

@Injectable()
export class ErrorEffects {

	constructor(private actions$: Actions,
				private router: Router,
				private dialog: MatDialog) {
	}

	@Effect()
	handle$: Observable<Action> = this.actions$.pipe(
		ofType(type(state.errorNamespace, error.ActionTypes.HANDLE)),
		map((action: error.Handle) => action.error),
		tap(err => this.handleError(err)),
		map(_ => new error.HandleSuccess())
	);

	/**
	 * Handles error depening on type
	 */
	private handleError(err: Error): void {
		this.dialog.open(ErrorDialogComponent);
	}

}