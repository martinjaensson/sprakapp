import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ErrorState } from './error.model';

import { reducer as errorReducer, initialState as errorInitialState, ErrorEffects } from './error';

const effects = [
	ErrorEffects
];

const reducers: ActionReducerMap<ErrorState> = {
	error: errorReducer
};

const initialState: ErrorState = {
	error: errorInitialState
};

export * from './error.model';
export const errorEffects = EffectsModule.forFeature(effects);
export const errorStore = StoreModule.forFeature('error', reducers, { initialState: initialState });