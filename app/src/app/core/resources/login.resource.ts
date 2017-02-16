import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiResource } from './api.resource';

import { LoginRequest, LoginResponse } from '../models';

import { CONFIG } from '../../../config';

@Injectable()
export class LoginResource extends ApiResource {

    constructor(private _http: Http) { 
        super();
    }

    login(loginRequest: LoginRequest): Observable<LoginResponse> {
        return this._http.post(`${CONFIG.api.url}/login`, JSON.stringify(loginRequest))
            .map(res => super.mapResponse<LoginResponse>(res))
            .catch(super.mapError);
    }

}