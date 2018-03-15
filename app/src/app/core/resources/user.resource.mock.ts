import { Observable } from 'rxjs/Observable';

import { ApiResource } from './api.resource';
import { UserResource } from './user.resource';

import { User, Error } from '../../shared/models';

export class MockUserResource extends ApiResource implements UserResource {

	constructor() {
		super(null);
	}

	getAuthenticated(): Observable<User> {
		let user = new User();
		return Observable.of(user);
	}

}