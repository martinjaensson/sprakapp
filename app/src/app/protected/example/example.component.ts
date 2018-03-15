import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../../core/state';
import { Example } from '../../shared/models';
import * as list from '../../shared/state/list';

import * as examples from './shared/state/examples';
import * as namespaces from './shared/state/namespaces';

@Component({
	selector: 'ex-example',
	templateUrl: './example.component.html',
	styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {

	examples$: Observable<Example[]>;

	constructor(private store$: Store<AppState>) { }

	ngOnInit(): void { 
		this.examples$ = this.store$.select(list.selectList(examples.selectState));
		this.store$.dispatch(new list.Load(namespaces.examples));
	}
}