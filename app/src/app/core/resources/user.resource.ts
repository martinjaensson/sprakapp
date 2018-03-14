import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiResource } from './api.resource';

import { User } from '../models';

import { CONFIG } from '../../../config';

@Injectable()
export class UserResource extends ApiResource {

    constructor(private _http: Http) { 
        super();
    }

    getAuthenticated(): Observable<User> {
        return this._http.get(`${CONFIG.api_url}/user/authenticated`)
            .map(res => super.mapResponse<User>(res))
            .catch(super.mapError);
    }

}