import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { SessionService } from '../services';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private _router: Router,
                private _sessionService: SessionService) { }

    canActivate(): Observable<boolean> {
        return this._sessionService.isAuthenticated()
            .do(isAuthenticated => {
                if (!isAuthenticated)
                    this._router.navigate([ '/login' ]);
            });
    }
}