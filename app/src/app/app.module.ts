import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { CONFIG } from '../config';

@NgModule({
    imports: [ 
        BrowserModule,

        CoreModule.forRoot(),
    
        AppRoutes,

        ..._getConditionalImports()
    ],
    declarations: [ 
        AppComponent, 
    ],
    bootstrap: [ 
        AppComponent 
    ],
    providers: [
        ..._getConditionalProviders()
    ]
})
export class AppModule { }

/**
 * Creates a list of providers based on 
 * build type
 */
function _getConditionalProviders() {
    let providers = [];

    if (CONFIG.cordova && CONFIG.platform === 'ios')
        providers.push({ provide: LocationStrategy, useClass: HashLocationStrategy });

    return providers;
}

/**
 * Creates a list of modules based on
 * build type
 */
function _getConditionalImports() {
    let imports = [];
    
    if (!CONFIG.production)
        imports.push(StoreDevtoolsModule.instrumentOnlyWithExtension());

    return imports;
}