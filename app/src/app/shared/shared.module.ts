import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { sharedComponents } from './components';
import { sharedDirectives } from './directives';
import { sharedPipes } from './pipes';

import {
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatCardModule,
	MatListModule,
	MatDialogModule,
	MatTabsModule,
	MatSidenavModule,
	MatToolbarModule,
	MatRippleModule,
	MatMenuModule,
	MatSnackBarModule,
	MatSlideToggleModule,
	MatSelectModule
} from '@angular/material';

export const materialComponents = [
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatCardModule,
	MatListModule,
	MatDialogModule,
	MatTabsModule,
	MatSidenavModule,
	MatToolbarModule,
	MatRippleModule,
	MatMenuModule,
	MatSnackBarModule,
	MatSlideToggleModule,
	MatSelectModule
];

/**
 * Contains all shared stuff for the application. This module
 * should be imported in all other app modules.
 */
@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,

		...materialComponents
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		FlexLayoutModule,

		...materialComponents,

		...sharedComponents,
		...sharedDirectives,
		...sharedPipes
	],
	declarations: [
		...sharedComponents,
		...sharedDirectives,
		...sharedPipes,
	]
})
export class SharedModule {

}
