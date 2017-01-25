import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { GUARDS } from './guards';
import { SERVICES } from './services';
import { RESOURCES } from './resources';
import { Store, EFFECTS } from './state';

/**
 * Contains all core functionality of the application.
 * Imported by the root module.
 */
@NgModule({
    imports: [
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
            ]
        };
    }
}
