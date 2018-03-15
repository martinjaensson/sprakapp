import { RouterModule } from '@angular/router';

import { ErrorPageComponent } from './page/error-page.component'; 
import { ErrorGuard } from './error.guard';

export const errorRoutes = RouterModule.forChild(
	[
		{ 
			path: 'error', 
			component: ErrorPageComponent,
			canActivate: [
				ErrorGuard
			]
		}
	]
);
