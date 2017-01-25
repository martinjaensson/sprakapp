import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { GUARDS } from './guards';
import { SERVICES } from './services';
import { RESOURCES } from './resources';
// import { STATE, STATE_EFFECTS } from './state';

@NgModule({
    imports: [
        HttpModule,
        
        // ...STATE_EFFECTS
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
                ...GUARDS,
                ...SERVICES,
                ...RESOURCES,
                // ...STATE,
            ]
        };
    }
}
