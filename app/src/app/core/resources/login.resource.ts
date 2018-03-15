import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiResource } from './api.resource';

import { LoginRequest, LoginResponse } from '../../shared/models';

import { environment } from '../../../config';

@Injectable()
export class LoginResource extends ApiResource {

	constructor(http: HttpClient) {
		super(http);
	}

	login(loginRequest: LoginRequest): Observable<LoginResponse> {
		return this.POST('login', loginRequest);
	}

}