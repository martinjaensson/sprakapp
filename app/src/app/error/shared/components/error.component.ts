import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { Error } from '../../../shared/models';

@Component({
	selector: 'ex-error',
	templateUrl: './error.component.html',
	styleUrls: ['./error.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent implements OnInit {

	@Input() error: Error;

	constructor(public dialogRef: MatDialogRef<ErrorComponent>) { }

	ngOnInit(): void { }
}