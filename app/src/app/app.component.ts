import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as session from './core/state/session';
import { AppState } from './core/state';

@Component({
	selector: 'ex-app',
	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

	initialized$: Observable<boolean>;

	constructor(private store$: Store<AppState>) { }

	ngOnInit(): void {
		this.initialized$ = this.store$.select(session.selectInitialized);
	}

}