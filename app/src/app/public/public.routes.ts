import { RouterModule, PreloadAllModules } from '@angular/router';

import { PublicComponent } from './public.component';
import { PublicGuard } from './public.guard';

export const publicRoutes = RouterModule.forChild(
	[
		{
			path: '',
			component: PublicComponent,
			canActivate: [
				PublicGuard
			],
			canActivateChild: [
				PublicGuard
			],
			children: [
				{
					path: 'login',
					loadChildren: './login/login.module#LoginModule'
				}
			]
		}
	]
);
