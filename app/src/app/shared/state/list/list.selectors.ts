import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';

import { ListState } from './list.model';

export interface ListSelector<T> {
	(state: AppState): ListState<T>;
}

export function selectList<T>(listSelector: ListSelector<T>): (state: AppState) => T[] { 
	return createSelector(listSelector, state => state.list); 
}

export function selectLoading<T>(listSelector: ListSelector<T>): (state: AppState) => boolean { 
	return createSelector(listSelector, state => state.loading); 
}