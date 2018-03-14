import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SessionService } from '../core/services';
import { LoginRequest } from '../core/models';

@Component({
    selector: 'ex-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
    logo = require("../../assets/img/RS_logo.png");

    loginRequest: LoginRequest = new LoginRequest();

    loginError$: Observable<string>;

    constructor(private _sessionService: SessionService) { }

    ngOnInit(): void { 
        this.loginError$ = this._sessionService.get()
            .map(sessionState => sessionState.loginError);
    }

    login(): void {
        this._sessionService.login(this.loginRequest);
    }
}