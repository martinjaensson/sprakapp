import { Action } from '@ngrx/store';
import { Error } from '../../../shared/models';

/**
 * General error action. Should be implemented by actions that
 * represents an error in the application.
 */
export interface ErrorAction extends Action {

	error: Error;

}