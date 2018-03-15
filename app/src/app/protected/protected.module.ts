import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { ProtectedComponent } from './protected.component';
import { ProtectedGuard } from './protected.guard'; 
import { protectedRoutes } from './protected.routes';

import { protectedComponents } from './shared/components';

@NgModule({
	imports: [
		SharedModule,

		protectedRoutes
	],
	exports: [],
	declarations: [
		ProtectedComponent,

		...protectedComponents
	],
	providers: [
		ProtectedGuard
	],
})
export class ProtectedModule { }
