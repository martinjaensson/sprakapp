import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

export const authenticationRoutes = RouterModule.forChild(
	[
		{ 
			path: 'redirect', 
			component: LoginComponent
		},
		{ 
			path: 'logout/redirect', 
			component: LogoutComponent
		}
	]
);
