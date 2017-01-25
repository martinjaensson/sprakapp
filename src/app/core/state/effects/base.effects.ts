import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '../'

/**
 * Contains general effect utilities. Should be the inherited
 * by all effect services.
 */
export class BaseEffects {

    constructor() { }

    /**
     * Handles a ResourceError thrown by a resource.
     */
    // handleError(e: any, caught: any, specificErrorAction: Action): Observable<Action> {
        // let err: Error = <Error>e;

        // let errorAction: Action = specificErrorAction;

        // if (err.statusCode == 401)
        //     errorAction = new error.ErrorUnathorized();

        // console.log(err);

        // return Observable.of(errorAction);
    // }
}