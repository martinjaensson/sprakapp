import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { OverviewComponent } from './overview.component';
import { OverviewRoutes } from './overview.routes';

@NgModule({
    imports: [ 
        SharedModule,

        OverviewRoutes
    ],
    exports: [],
    declarations: [ 
        OverviewComponent
    ],
    providers: [],
})
export class OverviewModule { }
