import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, ReplaySubject } from 'rxjs';

import { DialogMock } from '../../../../../../test/mock';

import { Error } from '../../../../shared/models';
import * as error from '../../../../shared/state/error';

import { ErrorEffects } from './error.effects';

describe('Error effects', () => {

	let router: Router;
	let effects: ErrorEffects;
	let actions$: ReplaySubject<any>;
	let sessionService: any;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes([])
			],
			providers: [
				ErrorEffects,
				provideMockActions(() => actions$),
				{ provide: MatDialog, useClass: DialogMock }
			]
		});

		router = TestBed.get(Router);
		effects = TestBed.get(ErrorEffects);
		actions$ = new ReplaySubject(1);

		sessionService = {

		};
	});
	

	it('handle$ should return HandleSuccess', (done) => {
		actions$.next(new error.Handle(new Error()));

		effects.handle$.subscribe((action: error.HandleSuccess) => {
			expect(action.key).toEqual(error.ActionTypes.HANDLE_SUCCESS);
			done();
		});
	});


});