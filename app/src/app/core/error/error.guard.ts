import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { ErrorService } from '../services';

@Injectable()
export class ErrorGuard implements CanActivate {

    constructor(private _router: Router,
                private _errorService: ErrorService) { }

    canActivate(): Observable<boolean> {
        return this._errorService.get()
            .map(error => {
                if (!error.error) {
                    this._router.navigate(['/']);
                    window.location.reload();
                    return false;
                }
                return true;
            });
    }
}