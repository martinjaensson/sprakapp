import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';

import { ErrorRoutes } from './error.routes';
import { ErrorGuard } from './error.guard';

import { ErrorPageComponent } from './page/error-page.component';
import { ErrorDialogComponent } from './dialog/error-dialog.component';
import { SHARED_COMPONENTS } from './shared';

@NgModule({
    imports: [ 
        SharedModule,

        ErrorRoutes
    ],
    exports: [],
    declarations: [ 
        ErrorPageComponent,
        ErrorDialogComponent,
        ...SHARED_COMPONENTS
    ],
    providers: [
        ErrorGuard
    ],
    entryComponents: [
        ErrorDialogComponent
    ]
})
export class ErrorModule { }
