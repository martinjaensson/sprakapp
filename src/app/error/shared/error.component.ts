import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { Error } from '../../core/models';

@Component({
    selector: 'ex-error',
    templateUrl: './error.component.html',
    styleUrls: [ './error.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {

    @Input()
    error: Error;

    constructor() { }

    ngOnInit() { }
}