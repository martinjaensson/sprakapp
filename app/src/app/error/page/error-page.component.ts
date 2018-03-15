import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Error } from '../../shared/models';
import { AppState } from '../../core/state';

import * as error from '../../shared/state/error';

@Component({
	selector: 'ex-error-page',
	templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

	error$: Observable<Error>;

	constructor(private store$: Store<AppState>) { }

	ngOnInit(): void {
		this.error$ = this.store$.select(error.selectError);
	}
}