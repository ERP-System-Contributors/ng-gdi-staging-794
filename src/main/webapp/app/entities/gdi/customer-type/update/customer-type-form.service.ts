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
