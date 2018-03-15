import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { startRoutes } from './start.routes';

import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	imports: [ 
		SharedModule,

		startRoutes
	],
	exports: [],
	declarations: [ 
		DashboardComponent
	],
	providers: [],
})
export class StartModule { }
