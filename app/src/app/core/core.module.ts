import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '../shared';
import { ErrorModule } from '../error';

import { coreInitializer } from './core.initializer';
import { coreServices, AuthenticationInterceptor } from './services';
import { coreResources } from './resources';
import { coreStore, coreEffects } from './state';

/**
 * Contains all core functionality of the application.
 * Imported by the root module.
 */
@NgModule({
	imports: [
		HttpClientModule,

		SharedModule,
		ErrorModule,

		coreStore,
		coreEffects
	],
	exports: [],
	declarations: [],
	providers: [
		...coreServices,
		...coreResources,
		coreInitializer,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthenticationInterceptor,
			multi: true
		}
	],
})
export class CoreModule { }
