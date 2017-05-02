import { LoginResource, UserResource } from '../../resources';
import * as sessionActions from '../actions/session.actions';
import { SessionEffects } from './session.effects';
import { inject, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EffectsRunner, EffectsTestingModule } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';

class MockRouter {
    get(no: any) {
        return Observable.from([{ id: 1 }]);
    };
    navigate(x: any) {
        return 'ret';
    }
}

class MockUserResource {
    getAuthenticated() {
        return { id: 'test' };
    }
};

class MockLoginResource {
    login(x: any) {
        return { token: 'not Test' };
    }
};

describe('Session Effects', () => {
    let runner: EffectsRunner;
    let effects: SessionEffects;
    let loginResource: LoginResource;
    let userResource: UserResource;
    let spy: jasmine.Spy;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                EffectsTestingModule,
                StoreModule.provideStore({})
            ],
            providers: [
                SessionEffects,
                { provide: Router, useClass: MockRouter },
                { provide: LoginResource, useClass: MockLoginResource },
                { provide: UserResource, useClass: MockUserResource },
            ]
        });
    });

    beforeEach(
        inject([EffectsRunner, SessionEffects, LoginResource, UserResource, Router],
            (_runner: any, _effects: any, _loginResource: any, _userResource: any, _router: any) => {
                runner = _runner;
                effects = _effects;
                loginResource = _loginResource;
                userResource = _userResource;
                router = _router;
            }
        )
    );

    it('[SET] should return a SET_SUCCESS action', (done) => {
        spy = spyOn(userResource, 'getAuthenticated').and.returnValue(Observable.from([{ user: 'test' }]));
        runner.queue({ type: sessionActions.ActionTypes.SET });

        effects.set$.subscribe(result => {
            expect(result.type).toEqual(sessionActions.ActionTypes.SET_SUCCESS);
            expect(result.payload.user).toBe('test');
            done();
        });
    });

    it('[SET] should handle errors from resource', (done) => {
        runner.queue({ type: sessionActions.ActionTypes.SET });
        spy = spyOn(userResource, 'getAuthenticated').and.returnValue(Observable.throw({ status: 404, message: 'test' }));

        let bool1: boolean, bool2: boolean, cnt = 0;
        effects.set$.subscribe(result => {
            cnt++;
            bool1 = (result.type.indexOf('[Error]') >= 0);
            bool2 = (result.type === sessionActions.ActionTypes.SET_ERROR);
            expect(bool1 || bool2).toBeTruthy();
            if (cnt === 2) { done(); }
        });
    });

    it('[LOGIN] should return a LOGIN_SUCCESS action', (done) => {
        spy = spyOn(loginResource, 'login').and.returnValue(Observable.from([{ token: 'test' }]));
        runner.queue({ type: sessionActions.ActionTypes.LOGIN, payload: {} });

        effects.login$.subscribe(result => {
            expect(result.type).toEqual(sessionActions.ActionTypes.LOGIN_SUCCESS);
            expect(result.payload).toBe('test');
            done();
        });
    });

    it('[LOGIN] should handle errors from resource', (done) => {
        runner.queue({ type: sessionActions.ActionTypes.LOGIN, payload: {} });
        spy = spyOn(loginResource, 'login').and.returnValue(Observable.throw({ status: 404, message: 'test' }));

        let bool1: boolean, bool2: boolean, cnt = 0;
        effects.login$.subscribe(result => {
            cnt++;
            bool1 = (result.type.indexOf('[Error]') >= 0);
            bool2 = (result.type === sessionActions.ActionTypes.LOGIN_ERROR);
            expect(bool1 || bool2).toBeTruthy();
            if (cnt === 2) { done(); }
        });
    });

    it('[LOGIN_SUCCESS] should return a SET action', (done) => {
        let store = spyOn(localStorage, 'setItem').and.stub();
        spy = spyOn(router, 'navigate').and.stub();
        runner.queue({ type: sessionActions.ActionTypes.LOGIN_SUCCESS, payload: 'token' });

        effects.handleLoginSuccess$.subscribe(result => {
            expect(result.type).toEqual(sessionActions.ActionTypes.SET);
            expect(store.calls.first().args[1]).toBe('token');
            expect(spy.calls.first().args[0][0]).toBe('/');
            done();
        });
    });

});