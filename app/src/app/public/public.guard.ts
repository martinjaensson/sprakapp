import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { tap, map } from 'rxjs/operators';

import { AuthenticationService } from '../core/services';

@Injectable()
export class PublicGuard implements CanActivate, CanActivateChild {

	constructor(private router: Router,
		private authenticationService: AuthenticationService) { }

	canActivate(): Observable<boolean> {
		return this.isNotAuthenticatedOrRedirect();
	}

	canActivateChild(): Observable<boolean> {
		return this.isNotAuthenticatedOrRedirect();
	}

	private isNotAuthenticatedOrRedirect(): Observable<boolean> {
		return this.authenticationService.isAuthenticated().pipe(
			tap(isAuthenticated => {
				if (isAuthenticated)
					this.router.navigate(['/']);
			}),
			map(isAuthenticated => !isAuthenticated)
		);
	}
}