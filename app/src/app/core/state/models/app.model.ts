import { SessionState, ErrorState } from './';

export interface AppState {
    
    session: SessionState;

    error: ErrorState;


}