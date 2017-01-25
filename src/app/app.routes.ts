import { RouterModule, PreloadAllModules } from '@angular/router';

export const AppRoutes = RouterModule.forRoot(
    [
        // { 
        //     path: 'login', 
        //     loadChildren: () => new Promise(resolve => {
        //         (require as any).ensure([], () => {
        //             resolve(require('./login/login.module').LoginModule);
        //         })
        //     }) 
        // },
        // { 
        //     path: 'error', 
        //     loadChildren: () => new Promise(resolve => {
        //         (require as any).ensure([], () => {
        //             resolve(require('./error/error.module').ErrorModule);
        //         })
        //     }) 
        // },
        { 
            path: '', 
            loadChildren: './private/private.module#PrivateModule'
        }
    ], {
        preloadingStrategy: PreloadAllModules
    }
);
