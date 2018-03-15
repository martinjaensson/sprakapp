// Core state
import { LayoutState } from './layout';
import { SessionState } from './session';

// Module state
import { ErrorState } from '../../error/shared/state';
import { ExampleState } from '../../protected/example/shared/state';

/**
 * Main interface class for the application state. Contains the core state
 * and the modularized state, which is optional because of lazy loading.
 */
export interface AppState {
	
	error?: ErrorState;
	
	example?: ExampleState;
	
	layout: LayoutState;

	session: SessionState;

}