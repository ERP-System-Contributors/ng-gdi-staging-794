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

import { IKenyanCurrencyDenomination, NewKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IKenyanCurrencyDenomination for edit and NewKenyanCurrencyDenominationFormGroupInput for create.
 */
type KenyanCurrencyDenominationFormGroupInput = IKenyanCurrencyDenomination | PartialWithRequiredKeyOf<NewKenyanCurrencyDenomination>;

type KenyanCurrencyDenominationFormDefaults = Pick<NewKenyanCurrencyDenomination, 'id'>;

type KenyanCurrencyDenominationFormGroupContent = {
  id: FormControl<IKenyanCurrencyDenomination['id'] | NewKenyanCurrencyDenomination['id']>;
  currencyDenominationCode: FormControl<IKenyanCurrencyDenomination['currencyDenominationCode']>;
  currencyDenominationType: FormControl<IKenyanCurrencyDenomination['currencyDenominationType']>;
  currencyDenominationTypeDetails: FormControl<IKenyanCurrencyDenomination['currencyDenominationTypeDetails']>;
};

export type KenyanCurrencyDenominationFormGroup = FormGroup<KenyanCurrencyDenominationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class KenyanCurrencyDenominationFormService {
  createKenyanCurrencyDenominationFormGroup(
    kenyanCurrencyDenomination: KenyanCurrencyDenominationFormGroupInput = { id: null }
  ): KenyanCurrencyDenominationFormGroup {
    const kenyanCurrencyDenominationRawValue = {
      ...this.getFormDefaults(),
      ...kenyanCurrencyDenomination,
    };
    return new FormGroup<KenyanCurrencyDenominationFormGroupContent>({
      id: new FormControl(
        { value: kenyanCurrencyDenominationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      currencyDenominationCode: new FormControl(kenyanCurrencyDenominationRawValue.currencyDenominationCode, {
        validators: [Validators.required],
      }),
      currencyDenominationType: new FormControl(kenyanCurrencyDenominationRawValue.currencyDenominationType, {
        validators: [Validators.required],
      }),
      currencyDenominationTypeDetails: new FormControl(kenyanCurrencyDenominationRawValue.currencyDenominationTypeDetails),
    });
  }

  getKenyanCurrencyDenomination(form: KenyanCurrencyDenominationFormGroup): IKenyanCurrencyDenomination | NewKenyanCurrencyDenomination {
    return form.getRawValue() as IKenyanCurrencyDenomination | NewKenyanCurrencyDenomination;
  }

  resetForm(form: KenyanCurrencyDenominationFormGroup, kenyanCurrencyDenomination: KenyanCurrencyDenominationFormGroupInput): void {
    const kenyanCurrencyDenominationRawValue = { ...this.getFormDefaults(), ...kenyanCurrencyDenomination };
    form.reset(
      {
        ...kenyanCurrencyDenominationRawValue,
        id: { value: kenyanCurrencyDenominationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): KenyanCurrencyDenominationFormDefaults {
    return {
      id: null,
    };
  }
}
