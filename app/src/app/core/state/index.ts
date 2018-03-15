import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppState } from './app.model';
export { AppState } from './app.model';

import { AuthenticationEffects } from './authentication';
import { reducer as layoutReducer, initialState as layoutInitialState } from './layout';
import { reducer as sessionReducer, initialState as sessionInitialState, SessionEffects } from './session';

const effects = [
	AuthenticationEffects,
	SessionEffects
];

const reducers: ActionReducerMap<AppState> = {
	layout: layoutReducer,
	session: sessionReducer
};

const initialState: AppState = {
	layout: layoutInitialState,
	session: sessionInitialState
};

export const coreEffects = EffectsModule.forRoot(effects);
export const coreStore = StoreModule.forRoot(reducers, { initialState: initialState });