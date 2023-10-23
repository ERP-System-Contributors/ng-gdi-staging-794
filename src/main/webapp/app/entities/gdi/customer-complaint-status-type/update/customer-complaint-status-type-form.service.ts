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
