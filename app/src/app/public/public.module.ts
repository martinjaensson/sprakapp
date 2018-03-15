import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { PublicComponent } from './public.component';
import { PublicGuard } from './public.guard';
import { publicRoutes } from './public.routes';

@NgModule({
	imports: [
		SharedModule,

		publicRoutes
	],
	exports: [],
	declarations: [
		PublicComponent
	],
	providers: [
		PublicGuard
	],
})
export class PublicModule { }
