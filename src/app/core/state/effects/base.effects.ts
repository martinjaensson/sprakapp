import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../';
import { ApiError, Error } from '../../models';

import * as errorActions from '../actions/error.actions';

/**
 * Contains general effect utilities. Should be the inherited
 * by all effect services.
 */
export class BaseEffects {

    constructor() { }

    /**
     * Handles a ResourceError thrown by a resource.
     */
    handleError(specificErrorAction: Action): (err: any, caught: Observable<any>) => Observable<Action> {
        return (e: any, caught: Observable<any>) => {

            // Cast to ApiError
            let err: ApiError = <ApiError>e;

            // Translate to error model
            let error = new Error();
            error.message = err.message;

            // Map to handling action
            let errorAction: Action;

            if (err.status == 0) {
                error.title = "Servern går ej att nå";
                error.message = "Kontrollera att du är ansluten till Internet. Om problemet kvarstår, kontakta administratör.";
                errorAction = new errorActions.Page(error);
            }
            else if (err.status == 401)
                errorAction = new errorActions.Logout(error);
            else if (err.status == 404)
                errorAction = new errorActions.Dialog(error);
            else if (err.status == 500) {
                error.title = "Ett fel inträffade på servern";
                error.message = "Om problemet kvarstår, kontakta administratör"
                errorAction = new errorActions.Dialog(error);
            }
            else {
                specificErrorAction.payload = error.message;
                errorAction = specificErrorAction;
            }

            return Observable.of(errorAction);
        }
    }
}