import { Observable } from 'rxjs/Observable';

import { MockApiResource } from './api.resource.mock';
import { ExampleResource } from './example.resource';

import { Example } from '../../shared/models';

export class MockExampleResource extends MockApiResource implements ExampleResource {
	
	list(): Observable<Example[]> {

		let ex1 = new Example();
		ex1.id = 1;
		ex1.name = 'Example 1';

		let ex2 = new Example();
		ex2.id = 1;
		ex2.name = 'Example 2';

		return this.successResponse([ex1, ex2]);
	}
	
}