// Re-export all state models
export * from './models';

// Export store provider
import { provideStore } from '@ngrx/store';
import { REDUCERS } from './reducers';
export const Store = provideStore(REDUCERS);

// Re-export effects
export * from './effects';