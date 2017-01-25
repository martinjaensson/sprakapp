import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
// import { APP_ROUTES } from './app.routes';

// import { SharedModule } from './shared';
// import { CoreModule } from './core';

import { CONFIG } from '../config';

let providers = [];

if (CONFIG.cordova && CONFIG.platform === 'ios')
    providers.push({ provide: LocationStrategy, useClass: HashLocationStrategy });

let devImports = [];
if (!CONFIG.production)
    devImports.push(StoreDevtoolsModule.instrumentOnlyWithExtension());

@NgModule({
    imports: [ 
        BrowserModule,
        // CoreModule.forRoot(),
        // RouterModule.forRoot(APP_ROUTES, {
        //     preloadingStrategy: PreloadAllModules
        // }),
        ...devImports
    ],
    declarations: [ 
        AppComponent, 
    ],
    bootstrap: [ 
        AppComponent 
    ],
    providers: [
        ...providers
    ]
})
export class AppModule {}

