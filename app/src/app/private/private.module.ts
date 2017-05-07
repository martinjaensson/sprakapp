import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';

import { PrivateComponent } from './private.component';
import { PrivateRoutes } from './private.routes';

import { COMPONENTS } from './components';

@NgModule({
    imports: [ 
        SharedModule,

        PrivateRoutes
    ],
    exports: [],
    declarations: [ 
        PrivateComponent,

        ...COMPONENTS
    ],
    providers: [],
})
export class PrivateModule { }
