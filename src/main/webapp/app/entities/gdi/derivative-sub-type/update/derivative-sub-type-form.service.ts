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

import { IDerivativeSubType, NewDerivativeSubType } from '../derivative-sub-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDerivativeSubType for edit and NewDerivativeSubTypeFormGroupInput for create.
 */
type DerivativeSubTypeFormGroupInput = IDerivativeSubType | PartialWithRequiredKeyOf<NewDerivativeSubType>;

type DerivativeSubTypeFormDefaults = Pick<NewDerivativeSubType, 'id'>;

type DerivativeSubTypeFormGroupContent = {
  id: FormControl<IDerivativeSubType['id'] | NewDerivativeSubType['id']>;
  financialDerivativeSubTypeCode: FormControl<IDerivativeSubType['financialDerivativeSubTypeCode']>;
  financialDerivativeSubTye: FormControl<IDerivativeSubType['financialDerivativeSubTye']>;
  financialDerivativeSubtypeDetails: FormControl<IDerivativeSubType['financialDerivativeSubtypeDetails']>;
};

export type DerivativeSubTypeFormGroup = FormGroup<DerivativeSubTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DerivativeSubTypeFormService {
  createDerivativeSubTypeFormGroup(derivativeSubType: DerivativeSubTypeFormGroupInput = { id: null }): DerivativeSubTypeFormGroup {
    const derivativeSubTypeRawValue = {
      ...this.getFormDefaults(),
      ...derivativeSubType,
    };
    return new FormGroup<DerivativeSubTypeFormGroupContent>({
      id: new FormControl(
        { value: derivativeSubTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      financialDerivativeSubTypeCode: new FormControl(derivativeSubTypeRawValue.financialDerivativeSubTypeCode, {
        validators: [Validators.required],
      }),
      financialDerivativeSubTye: new FormControl(derivativeSubTypeRawValue.financialDerivativeSubTye, {
        validators: [Validators.required],
      }),
      financialDerivativeSubtypeDetails: new FormControl(derivativeSubTypeRawValue.financialDerivativeSubtypeDetails),
    });
  }

  getDerivativeSubType(form: DerivativeSubTypeFormGroup): IDerivativeSubType | NewDerivativeSubType {
    return form.getRawValue() as IDerivativeSubType | NewDerivativeSubType;
  }

  resetForm(form: DerivativeSubTypeFormGroup, derivativeSubType: DerivativeSubTypeFormGroupInput): void {
    const derivativeSubTypeRawValue = { ...this.getFormDefaults(), ...derivativeSubType };
    form.reset(
      {
        ...derivativeSubTypeRawValue,
        id: { value: derivativeSubTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DerivativeSubTypeFormDefaults {
    return {
      id: null,
    };
  }
}
