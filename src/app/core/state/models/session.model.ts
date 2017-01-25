import { User } from '../../models';

export interface SessionState {

    initialized: boolean;

    user: User;
    
}