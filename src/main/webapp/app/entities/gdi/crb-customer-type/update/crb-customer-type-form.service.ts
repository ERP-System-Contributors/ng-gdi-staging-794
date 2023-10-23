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
