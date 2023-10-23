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

import { ICustomerType, NewCustomerType } from '../customer-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomerType for edit and NewCustomerTypeFormGroupInput for create.
 */
type CustomerTypeFormGroupInput = ICustomerType | PartialWithRequiredKeyOf<NewCustomerType>;

type CustomerTypeFormDefaults = Pick<NewCustomerType, 'id'>;

type CustomerTypeFormGroupContent = {
  id: FormControl<ICustomerType['id'] | NewCustomerType['id']>;
  customerTypeCode: FormControl<ICustomerType['customerTypeCode']>;
  customerType: FormControl<ICustomerType['customerType']>;
  customerTypeDescription: FormControl<ICustomerType['customerTypeDescription']>;
};

export type CustomerTypeFormGroup = FormGroup<CustomerTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerTypeFormService {
  createCustomerTypeFormGroup(customerType: CustomerTypeFormGroupInput = { id: null }): CustomerTypeFormGroup {
    const customerTypeRawValue = {
      ...this.getFormDefaults(),
      ...customerType,
    };
    return new FormGroup<CustomerTypeFormGroupContent>({
      id: new FormControl(
        { value: customerTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      customerTypeCode: new FormControl(customerTypeRawValue.customerTypeCode),
      customerType: new FormControl(customerTypeRawValue.customerType),
      customerTypeDescription: new FormControl(customerTypeRawValue.customerTypeDescription),
    });
  }

  getCustomerType(form: CustomerTypeFormGroup): ICustomerType | NewCustomerType {
    return form.getRawValue() as ICustomerType | NewCustomerType;
  }

  resetForm(form: CustomerTypeFormGroup, customerType: CustomerTypeFormGroupInput): void {
    const customerTypeRawValue = { ...this.getFormDefaults(), ...customerType };
    form.reset(
      {
        ...customerTypeRawValue,
        id: { value: customerTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerTypeFormDefaults {
    return {
      id: null,
    };
  }
}
