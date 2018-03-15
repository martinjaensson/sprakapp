import { RouterModule, PreloadAllModules } from '@angular/router';

import { ErrorModule } from './error';

export const appRoutes = RouterModule.forRoot(
	[
		{
			path: 'authentication',
			loadChildren: './authentication/authentication.module#AuthenticationModule'
		},
		{
			path: 'error',
			loadChildren: './error/error.module#ErrorModule'
		},
		{
			path: '',
			loadChildren: './protected/protected.module#ProtectedModule'
		},
		{
			path: '',
			loadChildren: './public/public.module#PublicModule'
		}
	], {
		preloadingStrategy: PreloadAllModules
	}
);
