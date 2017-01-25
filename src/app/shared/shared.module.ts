import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// import { COMPONENTS } from './components';
// import { DIRECTIVES } from './directives';
// import { PIPES } from './pipes';

import { 
    MaterialModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdTabsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdRippleModule,
    MdMenuModule,
    MdSnackBarModule,
    MdSlideToggleModule,
    MdSelectModule,
} from '@angular/material';

export const SHARED_MATERIAL_COMPONENTS = [ 
    MaterialModule,
    MdIconModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdListModule,
    MdDialogModule,
    MdTabsModule,
    MdSidenavModule,
    MdToolbarModule,
    MdRippleModule,
    MdMenuModule,
    MdSnackBarModule,
    MdSlideToggleModule,
    MdSelectModule,
];

export const SHARED_MATERIAL_COMPONENTS_ROOT: any[] = [];
for (let i = 0; i < SHARED_MATERIAL_COMPONENTS.length; i ++)
    SHARED_MATERIAL_COMPONENTS_ROOT.push(SHARED_MATERIAL_COMPONENTS[i].forRoot());

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        ...SHARED_MATERIAL_COMPONENTS_ROOT
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        ...SHARED_MATERIAL_COMPONENTS,

        // ...COMPONENTS,
        // ...DIRECTIVES,
        // ...PIPES
    ],
    declarations: [
        // ...COMPONENTS,
        // ...DIRECTIVES,
        // ...PIPES,
    ]
})
export class SharedModule {

}
