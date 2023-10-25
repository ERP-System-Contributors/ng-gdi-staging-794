///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
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

import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICounterpartyType, NewCounterpartyType } from '../counterparty-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICounterpartyType for edit and NewCounterpartyTypeFormGroupInput for create.
 */
type CounterpartyTypeFormGroupInput = ICounterpartyType | PartialWithRequiredKeyOf<NewCounterpartyType>;

type CounterpartyTypeFormDefaults = Pick<NewCounterpartyType, 'id'>;

type CounterpartyTypeFormGroupContent = {
  id: FormControl<ICounterpartyType['id'] | NewCounterpartyType['id']>;
  counterpartyTypeCode: FormControl<ICounterpartyType['counterpartyTypeCode']>;
  counterPartyType: FormControl<ICounterpartyType['counterPartyType']>;
  counterpartyTypeDescription: FormControl<ICounterpartyType['counterpartyTypeDescription']>;
};

export type CounterpartyTypeFormGroup = FormGroup<CounterpartyTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CounterpartyTypeFormService {
  createCounterpartyTypeFormGroup(counterpartyType: CounterpartyTypeFormGroupInput = { id: null }): CounterpartyTypeFormGroup {
    const counterpartyTypeRawValue = {
      ...this.getFormDefaults(),
      ...counterpartyType,
    };
    return new FormGroup<CounterpartyTypeFormGroupContent>({
      id: new FormControl(
        { value: counterpartyTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      counterpartyTypeCode: new FormControl(counterpartyTypeRawValue.counterpartyTypeCode, {
        validators: [Validators.required],
      }),
      counterPartyType: new FormControl(counterpartyTypeRawValue.counterPartyType, {
        validators: [Validators.required],
      }),
      counterpartyTypeDescription: new FormControl(counterpartyTypeRawValue.counterpartyTypeDescription),
    });
  }

  getCounterpartyType(form: CounterpartyTypeFormGroup): ICounterpartyType | NewCounterpartyType {
    return form.getRawValue() as ICounterpartyType | NewCounterpartyType;
  }

  resetForm(form: CounterpartyTypeFormGroup, counterpartyType: CounterpartyTypeFormGroupInput): void {
    const counterpartyTypeRawValue = { ...this.getFormDefaults(), ...counterpartyType };
    form.reset(
      {
        ...counterpartyTypeRawValue,
        id: { value: counterpartyTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CounterpartyTypeFormDefaults {
    return {
      id: null,
    };
  }
}
