import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../shared';
import { ErrorModule } from '../error';

import { GUARDS } from './guards';
import { SERVICES } from './services';
import { RESOURCES } from './resources';
import { Store, EFFECTS } from './state';
import { HTTP } from './utils';

/**
 * Contains all core functionality of the application.
 * Imported by the root module.
 */
@NgModule({
    imports: [
        SharedModule,
        ErrorModule,
        
        HttpModule,
        
        ...EFFECTS
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class CoreModule { 
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                Store,
                
                ...GUARDS,
                ...SERVICES,
                ...RESOURCES,
                ...HTTP
            ]
        };
    }
}
