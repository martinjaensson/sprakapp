import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiResource } from './api.resource';

import { Example } from '../../shared/models';

@Injectable()
export class ExampleResource extends ApiResource {

	constructor(http: HttpClient) {
		super(http);
	}

	list(): Observable<Example[]> {
		return this.GET('example');
	}

}