import { RouterModule, PreloadAllModules } from '@angular/router';

import { AuthenticationGuard } from '../core/guards';

import { PrivateComponent } from './private.component'; 

export const PrivateRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: PrivateComponent,
            canActivate: [
                AuthenticationGuard
            ],
            children: [
                {
                    path: '',
                    loadChildren: './dashboard/dashboard.module#DashboardModule'
                }
            ]
        }
    ]
);
