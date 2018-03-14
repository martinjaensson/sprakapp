import { RouterModule, PreloadAllModules } from '@angular/router';

import { OverviewComponent } from './overview.component';

export const OverviewRoutes = RouterModule.forChild(
    [
        { 
            path: '', 
            component: OverviewComponent
        }
    ]
);
