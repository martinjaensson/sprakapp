import { Component, EventEmitter, OnInit, Output, forwardRef, Input, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { MdAutocompleteTrigger } from "@angular/material";
import { Observable } from "rxjs/Rx";


@Component({
    selector: 'search-box-select',
    templateUrl: './serach-box-select.component.html',
    styleUrls: ['./serach-box-select.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchBoxSelectComponent),
            multi: true
        }
    ]
})
export class SearchBoxSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input()
    selectList: any[];

    @Input()
    initValue: any;

    @Input()
    getCurrentValue: boolean;

    @Input()
    getCurrentId: boolean;

    @Input()
    additionalSelect: any;

    @Input()
    boundProperty: string;

    @Input()
    placeholder: string;

    @Output()
    selectValue: EventEmitter<Object> = new EventEmitter<Object>();

    @Output()
    setValue: EventEmitter<Object> = new EventEmitter<Object>();

    @Output()
    setId: EventEmitter<number | string> = new EventEmitter<number | string>();

    @ViewChild(MdAutocompleteTrigger)
    autoComplete: MdAutocompleteTrigger

    allSelects: any[] = [];

    value: object | number;
    selectingValue: boolean;
    localPlaceholder: string;
    initPlaceholder: boolean = true;
    previousValueSelected: boolean = true;
    timer: any;
    currentSelectedItem: any;
    currentSelectedId: number | string;
    

    control = new FormControl();
    filteredSelectList$: Observable<any[]>;

    constructor(private _cd: ChangeDetectorRef) { }

    ngOnInit() {
        // Filter the list of objects
        this.filteredSelectList$ = this.control.valueChanges
            .startWith(null)
            .map(value => value && typeof value === 'object' ? value.displayName : value)
            .map(displayName => displayName ? this.filter(displayName) : ((this.allSelects) ? this.allSelects.slice() : []));

        // Tell the bound form that the value is changed
        this.control.valueChanges
            .filter(value => value && typeof value === 'object')
            .subscribe(value => { this.select(value) });
    }

    setPlaceholders(): void {
        this.localPlaceholder = this.placeholder;
        this.initPlaceholder = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('selectList' in changes || 'additionalSelect' in changes) {
            this.allSelects = [];
            if (this.selectList)
                this.allSelects = [...this.selectList];
            if (this.additionalSelect && !this.allSelects.find(value => value.id == this.additionalSelect.id))
                this.allSelects = [...this.allSelects, this.additionalSelect];
            this.updateValue(this.value);
        } else if ('getCurrentValue' in changes) {
            this.setValue.emit(this.currentSelectedItem);
        } else if ('getCurrentId' in changes) {
            this.setId.emit(this.currentSelectedId);
        }
    }

    select(value: any): void {
        this.selectingValue = true;
        if (!this.boundProperty)
            this.propagateChange(value);
        else
            this.propagateChange(value[this.boundProperty]);
        
        if (this.previousValueSelected) {
            this.timer = setTimeout(() => {
                this.selectValue.emit(value.item);
                
            }, 50);
            this.previousValueSelected = false;
        } else {
            this.previousValueSelected = true;
        }
        this.currentSelectedItem = value.item;
        this.currentSelectedId = value.id;
    }

    updateValue(value: object | number): void {
        if (typeof value == 'number') {
            this.control.setValue(this.allSelects.find(u => u.id == value));
        } else {
            this.control.setValue(value);
        }
    }

    displayWith(value: any): string {
        return value ? value.displayName : '';
    }

    private filter(val: string): any[] {
        if (this.selectingValue) {
            this.selectingValue = false;
            return this.allSelects;
        } else {
            return this.allSelects.filter(value => {
                let rx = new RegExp(val, 'gi');
                return rx.test(value.displayName);
            });
        }
    }

    resetSearch(): void {
        let value: any = this.control.value;
        if (!value || typeof value !== 'object') {
            this.control.setValue(null);
            this.propagateChange(null);
        }
    }

    /**
     * ControlValueAccessor methods
     */
    writeValue(value: object | number): void {
        if (value == null || value == 0) {
            this.localPlaceholder = this.placeholder;
            this.initPlaceholder = false;
        } else {
            this.localPlaceholder = "";
            this.initPlaceholder = true;
        }
        this.value = value;
        this.updateValue(value);
        //this._cd.detectChanges();
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void { }

    setDisabledState(isDisabled: boolean): void {
        if (isDisabled)
            this.control.disable();
        else
            this.control.enable();
        this._cd.markForCheck();
    }
}