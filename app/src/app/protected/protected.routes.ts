import { RouterModule, PreloadAllModules } from '@angular/router';

import { ProtectedComponent } from './protected.component';
import { ProtectedGuard } from './protected.guard';

export const protectedRoutes = RouterModule.forChild(
	[
		{
			path: '',
			component: ProtectedComponent,
			canActivate: [
				ProtectedGuard
			],
			canActivateChild: [
				ProtectedGuard
			],
			children: [
				{
					path: 'exempel',
					loadChildren: './example/example.module#ExampleModule'
				},
				{
					path: 'start',
					loadChildren: './start/start.module#StartModule'
				},
				{
					path: '',
					redirectTo: 'start'
				}
			]
		}
	]
);
