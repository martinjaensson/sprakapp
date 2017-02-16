import { RouterModule, PreloadAllModules } from '@angular/router';

export const AppRoutes = RouterModule.forRoot(
    [
        { 
            path: 'login', 
            loadChildren: './login/login.module#LoginModule' 
        },
        { 
            path: '', 
            loadChildren: './private/private.module#PrivateModule'
        }
    ], {
        preloadingStrategy: PreloadAllModules
    }
);
