import { Observable } from 'rxjs/Observable';

import { Error } from '../../shared/models';

import { ApiResource } from './api.resource';

export class MockApiResource extends ApiResource {

	private delay = 300;

	constructor() {
		super(null);
	}

	successResponse<T>(response: T): Observable<T> {
		return Observable.of(response).delay(this.delay);
	}

	errorResponse<T>(message: string, status: number): Observable<T> {
		let error = new Error();
		error.message = message;
		error.status = status;

		return Observable.throw(error);
	}
	
	protected GET<T>(url: string): Observable<T> {
		return null;
	}

	protected PUT<T>(url: string, data: any): Observable<T> {
		return null;
	}

	protected POST<T>(url: string, data: any): Observable<T> {
		return null;
	}

	protected DELETE<T>(url: string): Observable<T> {
		return null;
	}

}