import { Component, OnInit, trigger, state, style, transition, animate, keyframes  } from '@angular/core';
import { SessionService } from '../core/services';
import { Observable } from 'rxjs/Rx';
import {User} from '../core/models';

@Component({
    selector: 'ex-private',
    templateUrl: './private.component.html',
    styleUrls: [ './private.component.scss' ],
    animations: [
        trigger('sideNav', [
            state('inactive', style({
                transform: 'translate(0px,0px)',
            })),
            state('active', style({
                transform: 'translate(170px,0px)',
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ]),

    ]
})
export class PrivateComponent implements OnInit {
    /** VARIABLES */
    state: string = 'inactive';
    menuBtnPressed: boolean = false;
    logo = require("../../assets/img/RS_logo.png");
    user$: Observable<User>;
    
    constructor(private _sessionService: SessionService) { 
        
    }

    /*  METHODS **/    
    ngOnInit() { 
        this.user$ = this._sessionService.get().map(session => session.user);

    }

    logout() {
        this._sessionService.logout();
        this.toggleSidenav();
    }
    
    hideSidenav() {
        if(this.state === 'active' && !this.menuBtnPressed) {
            this.state = 'inactive';
        }
        this.menuBtnPressed = false;
    }

    toggleSidenav() {
         this.state = (this.state === 'inactive' ? 'active' : 'inactive');
         this.menuBtnPressed = true;
    }

    
}