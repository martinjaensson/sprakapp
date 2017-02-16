import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { type } from '../utils';

export const ActionTypes = {
    DIALOG:                 type('[Error] DIALOG'),
    LOGOUT:                 type('[Error] LOGOUT'),
    PAGE:                   type('[Error] PAGE'),

    HANDLED:                type('[Error] HANDLED')
};

/**
 * Handlin types
 */
export class Dialog implements Action {
    type = ActionTypes.DIALOG;

    constructor(public payload: any) {}
}

export class Logout {
    type = ActionTypes.LOGOUT;

    constructor(public payload: any) {}
}

export class Page {
    type = ActionTypes.PAGE;

    constructor(public payload: any) {}
}

/**
 * Handle success
 */
export class Handled {
    type = ActionTypes.HANDLED;
}

