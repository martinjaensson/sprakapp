import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../';
import { Error } from '../../models';

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
            // Cast to Error model
            let error = <Error>e;

            // Log error to console
            console.error(error);

            // Create error actions
            let errorActions: Action[] = [];

            let generalErrorAction = this._handleGeneralError(error);
            if (generalErrorAction)
                errorActions.push(generalErrorAction);
            
            specificErrorAction.payload = error.message;
            errorActions.push(specificErrorAction);

            return Observable.from(errorActions);
        }
    }

    private _handleGeneralError(error: Error): Action {
        if (!(error.status in this._handledErrors)) 
            return null;

        let errorAction: Action;
        let errorHandling = this._handledErrors[error.status];

        error.title = errorHandling.title;
        error.message = errorHandling.message;

        if (errorHandling.handling == 'page')
            errorAction = new errorActions.Page(error);
        else if (errorHandling.handling == 'dialog')
            errorAction = new errorActions.Dialog(error);
        else if (errorHandling.handling == 'logout')
            errorAction = new errorActions.Logout(error);

        return errorAction;
    }
}