import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { BaseAction } from '../base';
import { Error } from '../../models';

import { state } from '../../../../config';

abstract class ErrorAction<T extends string> extends BaseAction<T> {
	readonly namespace = state.errorNamespace;
}

export enum ActionTypes {
	HANDLE = 'HANDLE',
	HANDLE_SUCCESS = 'HANDLE_SUCCESS'
}

export class Handle extends ErrorAction<'HANDLE'> {
	readonly key = ActionTypes.HANDLE;

	constructor(public error: Error) { super(); }
}

export class HandleSuccess extends ErrorAction<'HANDLE_SUCCESS'> {
	readonly key = ActionTypes.HANDLE_SUCCESS;
}

export type Actions = Handle | HandleSuccess;

