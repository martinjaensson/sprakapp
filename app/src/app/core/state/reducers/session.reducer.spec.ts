import { SessionState } from '../';
import { User, LoginRequest } from '../../models';
import { LoginError } from '../actions/session.actions';
import * as sessionActions from '../actions/session.actions';
import { reducer } from './session.reducer';
/**
 * Remove these imports and
 * copy imports from the reducer under test
 */



/**
 * Setup necessary objects.
 */
let initialState: SessionState;
let user: User;
let loginError: LoginError;
// ... etc

describe('Session Reducer', () => {

    /**
     * Reset the state between runs to not cause problems between test cases.
     */
    beforeEach(() => {
        initialState = {
            initialized: false,
            user: null,

            loginError: null,
        };

        user = new User();
        user.username = "test";
        // reset any other variables in use as well, 
        // if they might be changed during tests.
    });

    it('[SET] should set user and initialized', () => {
        let res = reducer(initialState, new sessionActions.SetSuccess(user));
        expect(res.initialized).toBeTruthy();
        expect((<any>res.user).username).toBe("test");
    });

    it('[SET_NULL, SET_ERROR] should set initialized = false', () => {
        expect(initialState.initialized).toBe(false);

        let res = reducer(initialState, new sessionActions.SetError);
        expect(res.initialized).toBe(true);
    });

    it('[LOGIN] should set loginError = null', () => {
        initialState.loginError = 'error';
        expect(initialState.loginError).not.toBe(null);
        let res = reducer(initialState, new sessionActions.Login(new LoginRequest()));
        expect(res.loginError).toBe(null);
    });

    it('[LOGIN_SUCCESS] should set initialized = false', () => {
        initialState.initialized = true;
        let res = reducer(initialState, new sessionActions.LoginSuccess('test'));
        expect(res.initialized).toBe(false);
    });

    // it('[LOGIN_ERROR] should set loginError to payload', () => {
    //     initialState.loginError = null;
    //     let res = reducer(initialState, new sessionActions.LoginError());
    //     expect(res.loginError).toBeDefined("LoginError action doesn't have payload to use");
    // });

    it('[DEFAULT] should return state on default', () => {
        let res = reducer(initialState, { type: 'NotAtAllARealType', payload: 'SPAM' });
        expect(res.initialized).toBe(initialState.initialized);
        expect(res.loginError).toBe(initialState.loginError);
        expect(res.user).toBe(initialState.user);
    })
});