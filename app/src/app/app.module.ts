import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { CoreModule } from './core';

import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';

import { environment } from '../config';

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		CoreModule,

		appRoutes,

		StoreDevtoolsModule.instrument()
	],
	declarations: [
		AppComponent,
	],
	bootstrap: [
		AppComponent
	],
	providers: [
	]
})
export class AppModule { }