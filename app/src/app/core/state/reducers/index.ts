import { reducer as sessionReducer } from './session.reducer';
import { reducer as errorReducer } from './error.reducer';

export const REDUCERS = {
    session: sessionReducer,

    error: errorReducer
};