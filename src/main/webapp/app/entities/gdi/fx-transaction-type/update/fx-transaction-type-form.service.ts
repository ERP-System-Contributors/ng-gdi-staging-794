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

import { IFxTransactionType, NewFxTransactionType } from '../fx-transaction-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxTransactionType for edit and NewFxTransactionTypeFormGroupInput for create.
 */
type FxTransactionTypeFormGroupInput = IFxTransactionType | PartialWithRequiredKeyOf<NewFxTransactionType>;

type FxTransactionTypeFormDefaults = Pick<NewFxTransactionType, 'id'>;

type FxTransactionTypeFormGroupContent = {
  id: FormControl<IFxTransactionType['id'] | NewFxTransactionType['id']>;
  fxTransactionTypeCode: FormControl<IFxTransactionType['fxTransactionTypeCode']>;
  fxTransactionType: FormControl<IFxTransactionType['fxTransactionType']>;
  fxTransactionTypeDescription: FormControl<IFxTransactionType['fxTransactionTypeDescription']>;
};

export type FxTransactionTypeFormGroup = FormGroup<FxTransactionTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxTransactionTypeFormService {
  createFxTransactionTypeFormGroup(fxTransactionType: FxTransactionTypeFormGroupInput = { id: null }): FxTransactionTypeFormGroup {
    const fxTransactionTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxTransactionType,
    };
    return new FormGroup<FxTransactionTypeFormGroupContent>({
      id: new FormControl(
        { value: fxTransactionTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fxTransactionTypeCode: new FormControl(fxTransactionTypeRawValue.fxTransactionTypeCode, {
        validators: [Validators.required],
      }),
      fxTransactionType: new FormControl(fxTransactionTypeRawValue.fxTransactionType, {
        validators: [Validators.required],
      }),
      fxTransactionTypeDescription: new FormControl(fxTransactionTypeRawValue.fxTransactionTypeDescription),
    });
  }

  getFxTransactionType(form: FxTransactionTypeFormGroup): IFxTransactionType | NewFxTransactionType {
    return form.getRawValue() as IFxTransactionType | NewFxTransactionType;
  }

  resetForm(form: FxTransactionTypeFormGroup, fxTransactionType: FxTransactionTypeFormGroupInput): void {
    const fxTransactionTypeRawValue = { ...this.getFormDefaults(), ...fxTransactionType };
    form.reset(
      {
        ...fxTransactionTypeRawValue,
        id: { value: fxTransactionTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxTransactionTypeFormDefaults {
    return {
      id: null,
    };
  }
}
