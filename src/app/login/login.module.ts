import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { LoginRoutes } from './login.routes';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [ 
        SharedModule,

        LoginRoutes
    ],
    exports: [],
    declarations: [ 
        LoginComponent
    ],
    providers: []
})
export class LoginModule { }
