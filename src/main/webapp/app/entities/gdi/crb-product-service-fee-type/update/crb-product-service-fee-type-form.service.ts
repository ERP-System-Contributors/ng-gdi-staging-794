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

import { ICrbProductServiceFeeType, NewCrbProductServiceFeeType } from '../crb-product-service-fee-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbProductServiceFeeType for edit and NewCrbProductServiceFeeTypeFormGroupInput for create.
 */
type CrbProductServiceFeeTypeFormGroupInput = ICrbProductServiceFeeType | PartialWithRequiredKeyOf<NewCrbProductServiceFeeType>;

type CrbProductServiceFeeTypeFormDefaults = Pick<NewCrbProductServiceFeeType, 'id'>;

type CrbProductServiceFeeTypeFormGroupContent = {
  id: FormControl<ICrbProductServiceFeeType['id'] | NewCrbProductServiceFeeType['id']>;
  chargeTypeCode: FormControl<ICrbProductServiceFeeType['chargeTypeCode']>;
  chargeTypeDescription: FormControl<ICrbProductServiceFeeType['chargeTypeDescription']>;
  chargeTypeCategory: FormControl<ICrbProductServiceFeeType['chargeTypeCategory']>;
};

export type CrbProductServiceFeeTypeFormGroup = FormGroup<CrbProductServiceFeeTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbProductServiceFeeTypeFormService {
  createCrbProductServiceFeeTypeFormGroup(
    crbProductServiceFeeType: CrbProductServiceFeeTypeFormGroupInput = { id: null }
  ): CrbProductServiceFeeTypeFormGroup {
    const crbProductServiceFeeTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbProductServiceFeeType,
    };
    return new FormGroup<CrbProductServiceFeeTypeFormGroupContent>({
      id: new FormControl(
        { value: crbProductServiceFeeTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      chargeTypeCode: new FormControl(crbProductServiceFeeTypeRawValue.chargeTypeCode, {
        validators: [Validators.required],
      }),
      chargeTypeDescription: new FormControl(crbProductServiceFeeTypeRawValue.chargeTypeDescription),
      chargeTypeCategory: new FormControl(crbProductServiceFeeTypeRawValue.chargeTypeCategory, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbProductServiceFeeType(form: CrbProductServiceFeeTypeFormGroup): ICrbProductServiceFeeType | NewCrbProductServiceFeeType {
    return form.getRawValue() as ICrbProductServiceFeeType | NewCrbProductServiceFeeType;
  }

  resetForm(form: CrbProductServiceFeeTypeFormGroup, crbProductServiceFeeType: CrbProductServiceFeeTypeFormGroupInput): void {
    const crbProductServiceFeeTypeRawValue = { ...this.getFormDefaults(), ...crbProductServiceFeeType };
    form.reset(
      {
        ...crbProductServiceFeeTypeRawValue,
        id: { value: crbProductServiceFeeTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbProductServiceFeeTypeFormDefaults {
    return {
      id: null,
    };
  }
}
