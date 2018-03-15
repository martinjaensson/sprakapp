import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { errorRoutes } from './error.routes';
import { ErrorGuard } from './error.guard';
import { errorStore, errorEffects } from './shared/state';
import { errorComponents } from './shared/components';

import { ErrorPageComponent } from './page/error-page.component';
import { ErrorDialogComponent } from './dialog/error-dialog.component';

@NgModule({
	imports: [ 
		SharedModule,

		errorRoutes,
		errorStore,
		errorEffects
	],
	exports: [],
	declarations: [ 
		ErrorPageComponent,
		ErrorDialogComponent,
		...errorComponents
	],
	providers: [
		ErrorGuard
	],
	entryComponents: [
		ErrorDialogComponent
	]
})
export class ErrorModule { }
