import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ExampleState } from './example.model';

import { reducer as examplesReducer, initialState as examplesInitialState, ExamplesEffects } from './examples';

const effects = [
	ExamplesEffects
];

const reducers: ActionReducerMap<ExampleState> = {
	examples: examplesReducer
};

const initialState: ExampleState = {
	examples: examplesInitialState
};

export * from './example.model';
export const exampleEffects = EffectsModule.forFeature(effects);
export const exampleStore = StoreModule.forFeature('example', reducers, { initialState: initialState });