import { Router } from '@angular/router';

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, ReplaySubject } from 'rxjs';

import { UserResource } from '../../resources';

// Mock
import { MockUserResource } from  '../../resources/user.resource.mock';

import * as sessionActions from './session.actions';

import { SessionEffects } from './session.effects';

import { environment } from '../../../../config';

describe('Session effects', () => {

	let router: Router;
	let effects: SessionEffects;
	let userResource: UserResource;
	let actions$: ReplaySubject<any>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes([])
			],
			providers: [
				SessionEffects,
				provideMockActions(() => actions$),
				{ provide: UserResource, useClass: MockUserResource }
			]
		});

		router = TestBed.get(Router);
		effects = TestBed.get(SessionEffects);
		userResource = TestBed.get(UserResource);
		actions$ = new ReplaySubject(1);
	});
	

});