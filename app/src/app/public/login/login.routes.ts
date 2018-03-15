import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component'; 

export const loginRoutes = RouterModule.forChild(
	[
		{ 
			path: '', 
			component: LoginComponent,
		}
	]
);
