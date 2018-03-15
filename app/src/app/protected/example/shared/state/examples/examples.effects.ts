import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ExampleResource } from '../../../../../core/resources';
import { handleError, type } from '../../../../../shared/state/utils';

import * as list from '../../../../../shared/state/list';

import { examples as namespace } from '../namespaces';

@Injectable()
export class ExamplesEffects {

	constructor(private actions$: Actions,
				private exampleResource: ExampleResource) {
	}

	@Effect()
	load$: Observable<Action> = list.load(namespace, this.actions$, () => this.exampleResource.list());
}