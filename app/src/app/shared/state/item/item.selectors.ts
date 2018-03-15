import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';

import { ItemState } from './item.model';

export interface ItemSelector<T> {
	(state: AppState): ItemState<T>;
}

export function selectItem<T>(itemSelector: ItemSelector<T>): (state: AppState) => T { 
	return createSelector(itemSelector, state => state.item); 
}

export function selectLoading<T>(itemSelector: ItemSelector<T>): (state: AppState) => boolean { 
	return createSelector(itemSelector, state => state.loading); 
}