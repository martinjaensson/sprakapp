import { Observable } from 'rxjs/Observable';

import { MockApiResource } from './api.resource.mock';
import { LoginResource } from './login.resource';

import { LoginRequest, LoginResponse, Error } from '../../shared/models';

export class MockLoginResource extends MockApiResource implements LoginResource {

	static successToken = 'testtoken';

	login(loginRequest: LoginRequest): Observable<LoginResponse> {
		if (loginRequest.username === 'INVALID') 
			return this.errorResponse('Invalid credentials', 200);

		let response = new LoginResponse();
		response.token = MockLoginResource.successToken;

		return this.successResponse(response);
	}
}

export class MockValidLoginRequest extends LoginRequest {
	public username = 'VALID';
}

export class MockInvalidLoginRequest extends LoginRequest {
	public username = 'INVALID';
}