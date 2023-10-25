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

import { ICounterPartyDealType, NewCounterPartyDealType } from '../counter-party-deal-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICounterPartyDealType for edit and NewCounterPartyDealTypeFormGroupInput for create.
 */
type CounterPartyDealTypeFormGroupInput = ICounterPartyDealType | PartialWithRequiredKeyOf<NewCounterPartyDealType>;

type CounterPartyDealTypeFormDefaults = Pick<NewCounterPartyDealType, 'id'>;

type CounterPartyDealTypeFormGroupContent = {
  id: FormControl<ICounterPartyDealType['id'] | NewCounterPartyDealType['id']>;
  counterpartyDealCode: FormControl<ICounterPartyDealType['counterpartyDealCode']>;
  counterpartyDealTypeDetails: FormControl<ICounterPartyDealType['counterpartyDealTypeDetails']>;
  counterpartyDealTypeDescription: FormControl<ICounterPartyDealType['counterpartyDealTypeDescription']>;
};

export type CounterPartyDealTypeFormGroup = FormGroup<CounterPartyDealTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CounterPartyDealTypeFormService {
  createCounterPartyDealTypeFormGroup(
    counterPartyDealType: CounterPartyDealTypeFormGroupInput = { id: null }
  ): CounterPartyDealTypeFormGroup {
    const counterPartyDealTypeRawValue = {
      ...this.getFormDefaults(),
      ...counterPartyDealType,
    };
    return new FormGroup<CounterPartyDealTypeFormGroupContent>({
      id: new FormControl(
        { value: counterPartyDealTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      counterpartyDealCode: new FormControl(counterPartyDealTypeRawValue.counterpartyDealCode, {
        validators: [Validators.required],
      }),
      counterpartyDealTypeDetails: new FormControl(counterPartyDealTypeRawValue.counterpartyDealTypeDetails, {
        validators: [Validators.required],
      }),
      counterpartyDealTypeDescription: new FormControl(counterPartyDealTypeRawValue.counterpartyDealTypeDescription),
    });
  }

  getCounterPartyDealType(form: CounterPartyDealTypeFormGroup): ICounterPartyDealType | NewCounterPartyDealType {
    return form.getRawValue() as ICounterPartyDealType | NewCounterPartyDealType;
  }

  resetForm(form: CounterPartyDealTypeFormGroup, counterPartyDealType: CounterPartyDealTypeFormGroupInput): void {
    const counterPartyDealTypeRawValue = { ...this.getFormDefaults(), ...counterPartyDealType };
    form.reset(
      {
        ...counterPartyDealTypeRawValue,
        id: { value: counterPartyDealTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CounterPartyDealTypeFormDefaults {
    return {
      id: null,
    };
  }
}
