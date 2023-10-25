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

import { ICrbCustomerType, NewCrbCustomerType } from '../crb-customer-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbCustomerType for edit and NewCrbCustomerTypeFormGroupInput for create.
 */
type CrbCustomerTypeFormGroupInput = ICrbCustomerType | PartialWithRequiredKeyOf<NewCrbCustomerType>;

type CrbCustomerTypeFormDefaults = Pick<NewCrbCustomerType, 'id'>;

type CrbCustomerTypeFormGroupContent = {
  id: FormControl<ICrbCustomerType['id'] | NewCrbCustomerType['id']>;
  customerTypeCode: FormControl<ICrbCustomerType['customerTypeCode']>;
  customerType: FormControl<ICrbCustomerType['customerType']>;
  description: FormControl<ICrbCustomerType['description']>;
};

export type CrbCustomerTypeFormGroup = FormGroup<CrbCustomerTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbCustomerTypeFormService {
  createCrbCustomerTypeFormGroup(crbCustomerType: CrbCustomerTypeFormGroupInput = { id: null }): CrbCustomerTypeFormGroup {
    const crbCustomerTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbCustomerType,
    };
    return new FormGroup<CrbCustomerTypeFormGroupContent>({
      id: new FormControl(
        { value: crbCustomerTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      customerTypeCode: new FormControl(crbCustomerTypeRawValue.customerTypeCode, {
        validators: [Validators.required],
      }),
      customerType: new FormControl(crbCustomerTypeRawValue.customerType, {
        validators: [Validators.required],
      }),
      description: new FormControl(crbCustomerTypeRawValue.description),
    });
  }

  getCrbCustomerType(form: CrbCustomerTypeFormGroup): ICrbCustomerType | NewCrbCustomerType {
    return form.getRawValue() as ICrbCustomerType | NewCrbCustomerType;
  }

  resetForm(form: CrbCustomerTypeFormGroup, crbCustomerType: CrbCustomerTypeFormGroupInput): void {
    const crbCustomerTypeRawValue = { ...this.getFormDefaults(), ...crbCustomerType };
    form.reset(
      {
        ...crbCustomerTypeRawValue,
        id: { value: crbCustomerTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbCustomerTypeFormDefaults {
    return {
      id: null,
    };
  }
}
