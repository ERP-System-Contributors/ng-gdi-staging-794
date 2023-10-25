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

import { ICurrencyAuthenticityFlag, NewCurrencyAuthenticityFlag } from '../currency-authenticity-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICurrencyAuthenticityFlag for edit and NewCurrencyAuthenticityFlagFormGroupInput for create.
 */
type CurrencyAuthenticityFlagFormGroupInput = ICurrencyAuthenticityFlag | PartialWithRequiredKeyOf<NewCurrencyAuthenticityFlag>;

type CurrencyAuthenticityFlagFormDefaults = Pick<NewCurrencyAuthenticityFlag, 'id'>;

type CurrencyAuthenticityFlagFormGroupContent = {
  id: FormControl<ICurrencyAuthenticityFlag['id'] | NewCurrencyAuthenticityFlag['id']>;
  currencyAuthenticityFlag: FormControl<ICurrencyAuthenticityFlag['currencyAuthenticityFlag']>;
  currencyAuthenticityType: FormControl<ICurrencyAuthenticityFlag['currencyAuthenticityType']>;
  currencyAuthenticityTypeDetails: FormControl<ICurrencyAuthenticityFlag['currencyAuthenticityTypeDetails']>;
};

export type CurrencyAuthenticityFlagFormGroup = FormGroup<CurrencyAuthenticityFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CurrencyAuthenticityFlagFormService {
  createCurrencyAuthenticityFlagFormGroup(
    currencyAuthenticityFlag: CurrencyAuthenticityFlagFormGroupInput = { id: null }
  ): CurrencyAuthenticityFlagFormGroup {
    const currencyAuthenticityFlagRawValue = {
      ...this.getFormDefaults(),
      ...currencyAuthenticityFlag,
    };
    return new FormGroup<CurrencyAuthenticityFlagFormGroupContent>({
      id: new FormControl(
        { value: currencyAuthenticityFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      currencyAuthenticityFlag: new FormControl(currencyAuthenticityFlagRawValue.currencyAuthenticityFlag, {
        validators: [Validators.required],
      }),
      currencyAuthenticityType: new FormControl(currencyAuthenticityFlagRawValue.currencyAuthenticityType, {
        validators: [Validators.required],
      }),
      currencyAuthenticityTypeDetails: new FormControl(currencyAuthenticityFlagRawValue.currencyAuthenticityTypeDetails),
    });
  }

  getCurrencyAuthenticityFlag(form: CurrencyAuthenticityFlagFormGroup): ICurrencyAuthenticityFlag | NewCurrencyAuthenticityFlag {
    return form.getRawValue() as ICurrencyAuthenticityFlag | NewCurrencyAuthenticityFlag;
  }

  resetForm(form: CurrencyAuthenticityFlagFormGroup, currencyAuthenticityFlag: CurrencyAuthenticityFlagFormGroupInput): void {
    const currencyAuthenticityFlagRawValue = { ...this.getFormDefaults(), ...currencyAuthenticityFlag };
    form.reset(
      {
        ...currencyAuthenticityFlagRawValue,
        id: { value: currencyAuthenticityFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CurrencyAuthenticityFlagFormDefaults {
    return {
      id: null,
    };
  }
}
