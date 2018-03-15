import { RouterModule, PreloadAllModules } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';

export const startRoutes = RouterModule.forChild(
	[
		{ 
			path: '', 
			component: DashboardComponent
		}
	]
);
