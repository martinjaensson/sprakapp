import { RouterModule, PreloadAllModules } from '@angular/router';

export const AppRoutes = 
    [
        { 
            path: 'login', 
            loadChildren: './login/login.module#LoginModule' 
        },
        { 
            path: '', 
            loadChildren: './private/private.module#PrivateModule'
        }
    ];
