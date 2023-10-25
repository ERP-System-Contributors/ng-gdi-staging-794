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

import { IIsoCurrencyCode, NewIsoCurrencyCode } from '../iso-currency-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IIsoCurrencyCode for edit and NewIsoCurrencyCodeFormGroupInput for create.
 */
type IsoCurrencyCodeFormGroupInput = IIsoCurrencyCode | PartialWithRequiredKeyOf<NewIsoCurrencyCode>;

type IsoCurrencyCodeFormDefaults = Pick<NewIsoCurrencyCode, 'id'>;

type IsoCurrencyCodeFormGroupContent = {
  id: FormControl<IIsoCurrencyCode['id'] | NewIsoCurrencyCode['id']>;
  alphabeticCode: FormControl<IIsoCurrencyCode['alphabeticCode']>;
  numericCode: FormControl<IIsoCurrencyCode['numericCode']>;
  minorUnit: FormControl<IIsoCurrencyCode['minorUnit']>;
  currency: FormControl<IIsoCurrencyCode['currency']>;
  country: FormControl<IIsoCurrencyCode['country']>;
};

export type IsoCurrencyCodeFormGroup = FormGroup<IsoCurrencyCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class IsoCurrencyCodeFormService {
  createIsoCurrencyCodeFormGroup(isoCurrencyCode: IsoCurrencyCodeFormGroupInput = { id: null }): IsoCurrencyCodeFormGroup {
    const isoCurrencyCodeRawValue = {
      ...this.getFormDefaults(),
      ...isoCurrencyCode,
    };
    return new FormGroup<IsoCurrencyCodeFormGroupContent>({
      id: new FormControl(
        { value: isoCurrencyCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      alphabeticCode: new FormControl(isoCurrencyCodeRawValue.alphabeticCode, {
        validators: [Validators.required],
      }),
      numericCode: new FormControl(isoCurrencyCodeRawValue.numericCode, {
        validators: [Validators.required],
      }),
      minorUnit: new FormControl(isoCurrencyCodeRawValue.minorUnit, {
        validators: [Validators.required],
      }),
      currency: new FormControl(isoCurrencyCodeRawValue.currency, {
        validators: [Validators.required],
      }),
      country: new FormControl(isoCurrencyCodeRawValue.country),
    });
  }

  getIsoCurrencyCode(form: IsoCurrencyCodeFormGroup): IIsoCurrencyCode | NewIsoCurrencyCode {
    return form.getRawValue() as IIsoCurrencyCode | NewIsoCurrencyCode;
  }

  resetForm(form: IsoCurrencyCodeFormGroup, isoCurrencyCode: IsoCurrencyCodeFormGroupInput): void {
    const isoCurrencyCodeRawValue = { ...this.getFormDefaults(), ...isoCurrencyCode };
    form.reset(
      {
        ...isoCurrencyCodeRawValue,
        id: { value: isoCurrencyCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): IsoCurrencyCodeFormDefaults {
    return {
      id: null,
    };
  }
}
