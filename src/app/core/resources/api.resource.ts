import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiResponse, ApiError } from '../models';

/**
 * Abstract root class for all Api resources. Contains
 * methods for maping responses.
 */
export abstract class ApiResource {

    protected mapResponse<T>(response: Response): T {
        let apiResponse: ApiResponse = response.json();

        if (apiResponse.error) 
            throw Observable.throw(apiResponse.error);
        else 
            return apiResponse.data;
    }

    protected mapError(err: any, caught: any): Observable<ApiError> {
        let error: ApiError;

        if (err.error) {
            error = err.error;
        }
        else {
            try {
                error = err._body ? JSON.parse(err._body) : null;
                error.status = err.status;
            }
            catch (e) {
                error = new ApiError();
                error.status = 0;
                error.message = 'Unknown error';
            }
        }

        return Observable.throw(error);
    }

}