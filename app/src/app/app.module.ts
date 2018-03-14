import { LOCALE_ID, NgModule, NgModuleFactoryLoader, ModuleWithProviders } from '@angular/core';
import { DatePipe } from '@angular/common';

import { AppRoutes } from './app.routes';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, PreloadAllModules, Router } from '@angular/router';

import { CoreModule } from './core/core.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CONFIG } from "../config";

let dev = [];
if (!CONFIG.prodMode) {
    dev = [ StoreDevtoolsModule.instrumentOnlyWithExtension() ];
}

@NgModule({
    imports: [ 
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule.forRoot(),
        
        RouterModule.forRoot(AppRoutes, {
            preloadingStrategy: PreloadAllModules
        }),
        ...dev
    ],
    declarations: [ 
        AppComponent, 
    ],
    bootstrap: [ AppComponent ],
    providers: [
         { provide: LOCALE_ID, useValue: "sv-SE" },
         DatePipe,
    ]
})
export class AppModule { }