import { Response } from '@angular/http';
import { Observable } from 'rxjs';

import { ApiResponse, ApiError, Error } from '../models';

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

    protected mapError(err: any, caught: any): any {
        let error: Error = new Error();
        error.status = err.status;

        let apiError = ApiResource.tryParseApiError(err);
        if (apiError) {
            error.message = apiError.message;
        }   
        else {
            error.message = "Unknown error"; 
        }     

        return Observable.throw(error);
    }


    static tryParseApiError(err: any): ApiError {
        let apiError: ApiError;

        if (err.error) {
            return err.error;
        }
        else {
            try {
                return err._body ? JSON.parse(err._body) : null;
            }
            catch (e) { }
        }

        return null;
    }

}