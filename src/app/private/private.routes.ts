import { RouterModule, PreloadAllModules } from '@angular/router';

import { PrivateComponent } from './private.component'; 

export const PrivateRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: PrivateComponent,
            children: [
                {
                    path: '',
                    loadChildren: './dashboard/dashboard.module#DashboardModule'
                }
            ]
        }
    ]
);
