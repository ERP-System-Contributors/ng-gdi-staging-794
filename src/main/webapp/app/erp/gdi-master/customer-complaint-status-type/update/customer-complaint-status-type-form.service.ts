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

import { ICustomerComplaintStatusType, NewCustomerComplaintStatusType } from '../customer-complaint-status-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICustomerComplaintStatusType for edit and NewCustomerComplaintStatusTypeFormGroupInput for create.
 */
type CustomerComplaintStatusTypeFormGroupInput = ICustomerComplaintStatusType | PartialWithRequiredKeyOf<NewCustomerComplaintStatusType>;

type CustomerComplaintStatusTypeFormDefaults = Pick<NewCustomerComplaintStatusType, 'id'>;

type CustomerComplaintStatusTypeFormGroupContent = {
  id: FormControl<ICustomerComplaintStatusType['id'] | NewCustomerComplaintStatusType['id']>;
  customerComplaintStatusTypeCode: FormControl<ICustomerComplaintStatusType['customerComplaintStatusTypeCode']>;
  customerComplaintStatusType: FormControl<ICustomerComplaintStatusType['customerComplaintStatusType']>;
  customerComplaintStatusTypeDetails: FormControl<ICustomerComplaintStatusType['customerComplaintStatusTypeDetails']>;
};

export type CustomerComplaintStatusTypeFormGroup = FormGroup<CustomerComplaintStatusTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CustomerComplaintStatusTypeFormService {
  createCustomerComplaintStatusTypeFormGroup(
    customerComplaintStatusType: CustomerComplaintStatusTypeFormGroupInput = { id: null }
  ): CustomerComplaintStatusTypeFormGroup {
    const customerComplaintStatusTypeRawValue = {
      ...this.getFormDefaults(),
      ...customerComplaintStatusType,
    };
    return new FormGroup<CustomerComplaintStatusTypeFormGroupContent>({
      id: new FormControl(
        { value: customerComplaintStatusTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      customerComplaintStatusTypeCode: new FormControl(customerComplaintStatusTypeRawValue.customerComplaintStatusTypeCode, {
        validators: [Validators.required],
      }),
      customerComplaintStatusType: new FormControl(customerComplaintStatusTypeRawValue.customerComplaintStatusType, {
        validators: [Validators.required],
      }),
      customerComplaintStatusTypeDetails: new FormControl(customerComplaintStatusTypeRawValue.customerComplaintStatusTypeDetails),
    });
  }

  getCustomerComplaintStatusType(
    form: CustomerComplaintStatusTypeFormGroup
  ): ICustomerComplaintStatusType | NewCustomerComplaintStatusType {
    return form.getRawValue() as ICustomerComplaintStatusType | NewCustomerComplaintStatusType;
  }

  resetForm(form: CustomerComplaintStatusTypeFormGroup, customerComplaintStatusType: CustomerComplaintStatusTypeFormGroupInput): void {
    const customerComplaintStatusTypeRawValue = { ...this.getFormDefaults(), ...customerComplaintStatusType };
    form.reset(
      {
        ...customerComplaintStatusTypeRawValue,
        id: { value: customerComplaintStatusTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CustomerComplaintStatusTypeFormDefaults {
    return {
      id: null,
    };
  }
}
