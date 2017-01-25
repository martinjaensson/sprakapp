import { RouterModule, PreloadAllModules } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: DashboardComponent
        }
    ]
);
