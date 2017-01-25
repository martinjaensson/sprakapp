import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../utils';

import { User } from '../../models';

export const ActionTypes = {
    INITIALIZE:                 type('[Session] INITIALIZE'),

    SET:                        type('[Session] SET'),
    SET_SUCCESS:                type('[Session] SET_SUCCESS'),
    SET_ERROR:                  type('[Session] SET_ERROR'),
    SET_NULL:                   type('[Session] SET_NULL'),

    LOGIN:                      type('[Session] LOGIN'),
    LOGIN_SUCCESS:              type('[Session] LOGIN_SUCCESS'),
    LOGIN_ERROR:                type('[Session] LOGIN_ERROR'),

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

    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    type = ActionTypes.LOGIN_SUCCESS;
}

export class LoginError implements Action {
    type = ActionTypes.LOGIN_ERROR;

    constructor(public payload: string) {}
}

/**
 * Log out
 */
export class Logout implements Action {
    type = ActionTypes.LOGOUT;
}

