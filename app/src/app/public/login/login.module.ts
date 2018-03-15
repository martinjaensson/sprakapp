import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { loginComponents } from './shared/components';

import { LoginComponent } from './login.component';
import { loginRoutes } from './login.routes';

@NgModule({
	imports: [
		SharedModule,
		
		loginRoutes
	],
	exports: [],
	declarations: [
		LoginComponent,
		...loginComponents
	],
	providers: [
	]
})
export class LoginModule { }
