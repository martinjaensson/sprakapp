import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../utils';

import { User, LoginRequest } from '../../models';

export const ActionTypes = {
    INITIALIZE:                 type('[Session] INITIALIZE'),

    SET:                        type('[Session] SET'),
    SET_SUCCESS:                type('[Session] SET_SUCCESS'),
    SET_ERROR:                  type('[Session] SET_ERROR'),
    SET_NULL:                   type('[Session] SET_NULL'),

    LOGIN:                      type('[Session] LOGIN'),
    LOGIN_SUCCESS:              type('[Session] LOGIN_SUCCESS'),
    LOGIN_ERROR:                type('[Session] LOGIN_ERROR'),
    LOGIN_SUCCESS_HANDLED:      type('[Session] LOGIN_SUCCESS_HANDLED'),

    LOGOUT:                     type('[Session] LOGOUT'),
};

/**
 * Initialize
 */
export class Initialize implements Action {
    type = ActionTypes.INITIALIZE;
}

/**
 * Set actions
 */
export class SetNull implements Action {
    type = ActionTypes.SET_NULL;
}

export class SetSuccess implements Action {
    type = ActionTypes.SET_SUCCESS;

    constructor(public payload: User) {}
}

export class SetError implements Action {
    type = ActionTypes.SET_ERROR;
}

export class Set implements Action {
    type = ActionTypes.SET;
}

/**
 * Login
 */
export class Login implements Action {
    type = ActionTypes.LOGIN;

    constructor(public payload: LoginRequest) {}
}

export class LoginSuccess implements Action {
    type = ActionTypes.LOGIN_SUCCESS;

    constructor(public payload: string) {}
}

export class LoginError implements Action {
    type = ActionTypes.LOGIN_ERROR;
}

/**
 * Log out
 */
export class Logout implements Action {
    type = ActionTypes.LOGOUT;
}

