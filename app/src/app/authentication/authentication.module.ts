import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { authenticationRoutes } from './authentication.routes';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

/**
 * Handles oauth authentication callbacks
 */
@NgModule({
	imports: [ 
		SharedModule,

		authenticationRoutes
	],
	exports: [],
	declarations: [ 
		LoginComponent,
		LogoutComponent
	],
	providers: [
	]
})
export class AuthenticationModule { 
}