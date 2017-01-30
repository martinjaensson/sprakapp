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

    private _handledErrors: { [key: number ]: { handling: 'page' | 'dialog' | 'logout' | 'custom', title: string, message: string } } = {
        0: {
            handling: 'page',
            title: "Servern går ej att nå",
            message: "Kontrollera att du är ansluten till Internet. Om problemet kvarstår, kontakta administratör."
        },
        401: {
            handling: 'logout',
            title: "",
            message: ""
        },
        404: {
            handling: 'logout',
            title: "",
            message: ""
        },
        500: {
            handling: 'dialog',
            title: "Ett fel inträffade på servern",
            message: "Om problemet kvarstår, kontakta administratör"
        }
    };

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

            if (err.status in this._handledErrors) {
                let errorHandling = this._handledErrors[err.status];

                let error = new Error();
                error.title = errorHandling.title;
                error.message = errorHandling.message;

                if (errorHandling.handling == 'page')
                    errorAction = new errorActions.Page(error);
                else if (errorHandling.handling == 'dialog')
                    errorAction = new errorActions.Dialog(error);
                else if (errorHandling.handling == 'logout')
                    errorAction = new errorActions.Logout(error);
            }
            else {
                specificErrorAction.payload = error.message;
                errorAction = specificErrorAction;
            }

            console.error(e);

            return Observable.of(errorAction);
        }
    }
}