import { Injectable } from '@angular/core';
import { Http, ConnectionBackend, RequestOptions, RequestOptionsArgs, BaseRequestOptions, Response, Headers, XHRBackend } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CONFIG } from '../../../config';

@Injectable()
export class ApiHttp extends Http {
    
    constructor(_backend: ConnectionBackend, _defaultOptions: RequestOptions) {
        super(_backend, _defaultOptions);
    }
    
    /**
     * Adds authentication token to request header
     */
    private _addHeaders(options: RequestOptionsArgs): RequestOptionsArgs {
        options = options || new BaseRequestOptions();
        options.headers = options.headers || new Headers();
        
        var token: string = localStorage.getItem(CONFIG.tokenName);
        if (token && token !== 'null') 
            options.headers.append('Authorization', 'Bearer ' + token);

        options.headers.append('Content-Type', 'application/json');
        return options;
    }
    
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this._addHeaders(options);
        return super.put(url, body, options);
    }
    
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this._addHeaders(options);
        return super.post(url, body, options);
    }
    
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this._addHeaders(options);
        options.body = {};
        return super.get(url, options);
    }
    
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        options = this._addHeaders(options);
        return super.delete(url, options);
    }
    
}

export const HTTP = [
    { provide: ConnectionBackend, useClass: XHRBackend }, // Needed for custom Http (?)
    { provide: Http, useClass: ApiHttp }
];