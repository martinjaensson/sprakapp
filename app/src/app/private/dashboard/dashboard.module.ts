import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routes';

@NgModule({
    imports: [ 
        SharedModule,

        DashboardRoutes
    ],
    exports: [],
    declarations: [ 
        DashboardComponent
    ],
    providers: [],
})
export class DashboardModule { }
