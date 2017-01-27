import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ErrorService } from '../../../core/services';
import { Error } from '../../../core/models';

@Component({
    selector: 'ex-error-page',
    templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

    error$: Observable<Error>;

    constructor(private _errorService: ErrorService) { }

    ngOnInit(): void { 
        this.error$ = this._errorService.get()
            .map(errorState => errorState.error);
    }
}