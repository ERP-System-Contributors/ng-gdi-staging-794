///
/// Erp System - Mark II No 20 (Baruch Series) Client v 0.0.9-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ApplicationUserSuggestionService } from '../../suggestion/application-user-suggestion.service';
import { IApplicationUser } from '../../application-user/application-user.model';

@Component({
  selector: 'jhi-m21-application-user-form-control',
  templateUrl: './m21-application-user-form-control.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => M21ApplicationUserFormControlComponent),
      multi: true
    }
  ]
})
export class M21ApplicationUserFormControlComponent implements OnInit, ControlValueAccessor, OnDestroy {

  @Input() inputValue: IApplicationUser = {}

  @Input() inputControlLabel = '';

  @Output() valueSelected: EventEmitter<IApplicationUser> = new EventEmitter<IApplicationUser>();

  minAccountLengthTerm = 3;
  valuesLoading = false;
  valueControlInput$ = new Subject<string>();
  valueLookUps$: Observable<IApplicationUser[]> = of([]);

  constructor(
    protected valueSuggestionService: ApplicationUserSuggestionService
  ) {}

  onChange: any = () => {
    this.getValues();
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: any = () => {};

  ngOnInit(): void {

    this.loadValues();
  }

  ngOnDestroy(): void {

    this.valueLookUps$ = of([]);
    this.inputValue = {}
  }

  loadValues(): void {
    this.valueLookUps$ = concat(
      of([]), // default items
      this.valueControlInput$.pipe(
        /* filter(res => res.length >= this.minAccountLengthTerm), */
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        filter(res => res !== null),
        distinctUntilChanged(),
        debounceTime(800),
        tap(() => this.valuesLoading = true),
        switchMap(term => this.valueSuggestionService.search(term).pipe(
          catchError(() => of([])),
          tap(() => this.valuesLoading = false)
        ))
      ),
    );
  }

  trackValueByFn(item: any): number {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return item.id!;
  }

  writeValue(value: IApplicationUser): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value) {
      this.inputValue = value;
    }
  }

  getValues(): void {
    this.valueSelected.emit(this.inputValue);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}