import { createSelector } from '@ngrx/store';

import { AppState } from '../../../core/state';

export const selectState = (state: AppState) => state.error;
export const selectError = createSelector(selectState, state => state.error);