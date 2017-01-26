import { RouterModule } from '@angular/router';

import { ErrorPageComponent } from './page/error-page.component'; 

export const ErrorRoutes = RouterModule.forChild(
    [
        { 
            path: 'error', 
            component: ErrorPageComponent,
        }
    ]
);
