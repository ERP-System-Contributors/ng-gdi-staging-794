import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFxCustomerType, NewFxCustomerType } from '../fx-customer-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxCustomerType for edit and NewFxCustomerTypeFormGroupInput for create.
 */
type FxCustomerTypeFormGroupInput = IFxCustomerType | PartialWithRequiredKeyOf<NewFxCustomerType>;

type FxCustomerTypeFormDefaults = Pick<NewFxCustomerType, 'id'>;

type FxCustomerTypeFormGroupContent = {
  id: FormControl<IFxCustomerType['id'] | NewFxCustomerType['id']>;
  foreignExchangeCustomerTypeCode: FormControl<IFxCustomerType['foreignExchangeCustomerTypeCode']>;
  foreignCustomerType: FormControl<IFxCustomerType['foreignCustomerType']>;
};

export type FxCustomerTypeFormGroup = FormGroup<FxCustomerTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxCustomerTypeFormService {
  createFxCustomerTypeFormGroup(fxCustomerType: FxCustomerTypeFormGroupInput = { id: null }): FxCustomerTypeFormGroup {
    const fxCustomerTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxCustomerType,
    };
    return new FormGroup<FxCustomerTypeFormGroupContent>({
      id: new FormControl(
        { value: fxCustomerTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      foreignExchangeCustomerTypeCode: new FormControl(fxCustomerTypeRawValue.foreignExchangeCustomerTypeCode, {
        validators: [Validators.required],
      }),
      foreignCustomerType: new FormControl(fxCustomerTypeRawValue.foreignCustomerType, {
        validators: [Validators.required],
      }),
    });
  }

  getFxCustomerType(form: FxCustomerTypeFormGroup): IFxCustomerType | NewFxCustomerType {
    return form.getRawValue() as IFxCustomerType | NewFxCustomerType;
  }

  resetForm(form: FxCustomerTypeFormGroup, fxCustomerType: FxCustomerTypeFormGroupInput): void {
    const fxCustomerTypeRawValue = { ...this.getFormDefaults(), ...fxCustomerType };
    form.reset(
      {
        ...fxCustomerTypeRawValue,
        id: { value: fxCustomerTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxCustomerTypeFormDefaults {
    return {
      id: null,
    };
  }
}
