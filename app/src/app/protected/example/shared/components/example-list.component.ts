import { Component, Input } from '@angular/core';

import { Example } from '../../../../shared/models';

@Component({
	selector: 'ex-example-list',
	templateUrl: './example-list.component.html'
})
export class ExampleListComponent {

	@Input() examples: Example[];

	constructor() { }
}