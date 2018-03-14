import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'ex-pager',
	templateUrl: './pager.component.html',
	styleUrls: [ './pager.component.scss' ]
})
export class PagerComponent implements OnInit {

	@Input()
	page: number;

	@Input()
	pages: number;

	@Output()
	prev: EventEmitter<any> = new EventEmitter<any>();

	@Output()
	next: EventEmitter<any> = new EventEmitter<any>();
	
	constructor() { }

	ngOnInit() { }

}