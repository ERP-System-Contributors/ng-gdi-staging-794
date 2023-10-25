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

import { IAgriculturalEnterpriseActivityType, NewAgriculturalEnterpriseActivityType } from '../agricultural-enterprise-activity-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAgriculturalEnterpriseActivityType for edit and NewAgriculturalEnterpriseActivityTypeFormGroupInput for create.
 */
type AgriculturalEnterpriseActivityTypeFormGroupInput =
  | IAgriculturalEnterpriseActivityType
  | PartialWithRequiredKeyOf<NewAgriculturalEnterpriseActivityType>;

type AgriculturalEnterpriseActivityTypeFormDefaults = Pick<NewAgriculturalEnterpriseActivityType, 'id'>;

type AgriculturalEnterpriseActivityTypeFormGroupContent = {
  id: FormControl<IAgriculturalEnterpriseActivityType['id'] | NewAgriculturalEnterpriseActivityType['id']>;
  agriculturalEnterpriseActivityTypeCode: FormControl<IAgriculturalEnterpriseActivityType['agriculturalEnterpriseActivityTypeCode']>;
  agriculturalEnterpriseActivityType: FormControl<IAgriculturalEnterpriseActivityType['agriculturalEnterpriseActivityType']>;
  agriculturalEnterpriseActivityTypeDescription: FormControl<
    IAgriculturalEnterpriseActivityType['agriculturalEnterpriseActivityTypeDescription']
  >;
};

export type AgriculturalEnterpriseActivityTypeFormGroup = FormGroup<AgriculturalEnterpriseActivityTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AgriculturalEnterpriseActivityTypeFormService {
  createAgriculturalEnterpriseActivityTypeFormGroup(
    agriculturalEnterpriseActivityType: AgriculturalEnterpriseActivityTypeFormGroupInput = { id: null }
  ): AgriculturalEnterpriseActivityTypeFormGroup {
    const agriculturalEnterpriseActivityTypeRawValue = {
      ...this.getFormDefaults(),
      ...agriculturalEnterpriseActivityType,
    };
    return new FormGroup<AgriculturalEnterpriseActivityTypeFormGroupContent>({
      id: new FormControl(
        { value: agriculturalEnterpriseActivityTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      agriculturalEnterpriseActivityTypeCode: new FormControl(
        agriculturalEnterpriseActivityTypeRawValue.agriculturalEnterpriseActivityTypeCode,
        {
          validators: [Validators.required],
        }
      ),
      agriculturalEnterpriseActivityType: new FormControl(agriculturalEnterpriseActivityTypeRawValue.agriculturalEnterpriseActivityType, {
        validators: [Validators.required],
      }),
      agriculturalEnterpriseActivityTypeDescription: new FormControl(
        agriculturalEnterpriseActivityTypeRawValue.agriculturalEnterpriseActivityTypeDescription
      ),
    });
  }

  getAgriculturalEnterpriseActivityType(
    form: AgriculturalEnterpriseActivityTypeFormGroup
  ): IAgriculturalEnterpriseActivityType | NewAgriculturalEnterpriseActivityType {
    return form.getRawValue() as IAgriculturalEnterpriseActivityType | NewAgriculturalEnterpriseActivityType;
  }

  resetForm(
    form: AgriculturalEnterpriseActivityTypeFormGroup,
    agriculturalEnterpriseActivityType: AgriculturalEnterpriseActivityTypeFormGroupInput
  ): void {
    const agriculturalEnterpriseActivityTypeRawValue = { ...this.getFormDefaults(), ...agriculturalEnterpriseActivityType };
    form.reset(
      {
        ...agriculturalEnterpriseActivityTypeRawValue,
        id: { value: agriculturalEnterpriseActivityTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AgriculturalEnterpriseActivityTypeFormDefaults {
    return {
      id: null,
    };
  }
}
