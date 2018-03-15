import { ExampleResource } from './example.resource';
import { UserResource } from './user.resource';
import { LoginResource } from './login.resource';

export { ExampleResource } from './example.resource';
export { UserResource } from './user.resource';
export { LoginResource } from './login.resource';

export const coreResources = [
	ExampleResource,
	UserResource,
	LoginResource
];