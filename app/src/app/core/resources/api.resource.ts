import { RequestOptionsArgs, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';

import { Error } from '../../shared/models';

import { environment } from '../../../config';

/**
 * Base class for all resources communicating with the API.
 * Contains functions for request etc.
 * 
 * Should be the base class of all API resources.
 */
export abstract class ApiResource {

	private baseUrl: string = environment.api.url;

	constructor(private http: HttpClient) { }

	/**
	 * HTTP methods. Adds the required headers and base url. 
	 */
	protected GET<T>(url: string): Observable<T> {
		return this.http.get<T>(`${this.baseUrl}/${url}`, this.createOptions()).pipe(
			map(this.mapResponse),
			catchError(this.mapError)
		);
	}

	protected PUT<T>(url: string, data: any): Observable<T> {
		return this.http.put(`${this.baseUrl}/${url}`, JSON.stringify(data), this.createOptions()).pipe(
			map(this.mapResponse),
			catchError(this.mapError)
		);
	}

	protected POST<T>(url: string, data: any): Observable<T> {
		return this.http.post<T>(`${this.baseUrl}/${url}`, JSON.stringify(data), this.createOptions()).pipe(
			map(this.mapResponse),
			catchError(this.mapError)
		);
	}

	protected DELETE<T>(url: string): Observable<T> {
		return this.http.delete<T>(`${this.baseUrl}/${url}`, this.createOptions()).pipe(
			map(this.mapResponse),
			catchError(this.mapError)
		);
	}

	/**
	 * Maps the api response to model object
	 */
	private mapResponse<T>(response: any): T {
		return <T>response.data;
	}

	private mapError(errorResponse: HttpErrorResponse, caught: any): Observable<any> {
		let error = new Error();
		error = errorResponse.error;
		error.status = errorResponse.status;

		return _throw(error);
	}

	/**
	 * Creates required request options
	 */
	private createOptions(): { headers: HttpHeaders } {
		let headers = new HttpHeaders();

		// Set content type
		headers = headers.set('Content-Type', 'application/json');

		return { headers: headers };
	}

}