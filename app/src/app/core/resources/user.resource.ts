import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiResource } from './api.resource';

import { User } from '../../shared/models';

import { environment } from '../../../config';

@Injectable()
export class UserResource extends ApiResource {

	constructor(http: HttpClient) {
		super(http);
	}

	getAuthenticated(): Observable<User> {
		return this.GET('user/authenticated');
	}

}