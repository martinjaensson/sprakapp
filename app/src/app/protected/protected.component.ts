import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../core/state';
import { User } from '../shared/models';

import * as layout from '../core/state/layout';
import * as session from '../core/state/session';
import * as authentication from '../core/state/authentication';

@Component({
	selector: 'ex-protected',
	templateUrl: './protected.component.html',
	styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {

	user$: Observable<User>;

	isMenuVisible$: Observable<boolean>;

	constructor(private store$: Store<AppState>) { }

	ngOnInit(): void { 
		this.user$ = this.store$.select(session.selectUser);
		this.isMenuVisible$ = this.store$.select(layout.selectMenuVisible);
	}

	toggleMenu(): void {
		this.store$.dispatch(new layout.ToggleMenu());
	}

	logout(): void {
		this.store$.dispatch(new authentication.Logout());
	}
	
}