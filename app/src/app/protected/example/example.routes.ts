import { RouterModule, PreloadAllModules } from '@angular/router';

import { ExampleComponent } from './example.component';

export const exampleRoutes = RouterModule.forChild(
	[
		{
			path: '',
			component: ExampleComponent
		}
	]
);
