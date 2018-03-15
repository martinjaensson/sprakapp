import { EffectsModule } from '@ngrx/effects';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

import { SharedModule } from '../../shared';

import { exampleComponents } from './shared/components';
import { exampleStore, exampleEffects } from './shared/state';
import { exampleRoutes } from './example.routes';
import { ExampleComponent } from './example.component';

@NgModule({
	imports: [
		SharedModule,

		exampleRoutes,

		exampleStore,
		exampleEffects
	],
	exports: [],
	declarations: [
		ExampleComponent,
		...exampleComponents
	],
	providers: [
	],
})
export class ExampleModule { }
