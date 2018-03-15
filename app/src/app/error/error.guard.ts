import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { tap, map } from 'rxjs/operators';

import { AppState } from '../core/state';
import * as error from '../shared/state/error';

@Injectable()
export class ErrorGuard implements CanActivate {

	constructor(private router: Router,
		private store$: Store<AppState>) { }

	canActivate(): Observable<boolean> {
		return this.store$.pipe(
			select(error.selectError),
			map(err => !!err),
			tap(hasError => {
				if (!hasError)
					this.router.navigate(['/']);
			})
		);
	}
}