import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFxTransactionRateType, NewFxTransactionRateType } from '../fx-transaction-rate-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxTransactionRateType for edit and NewFxTransactionRateTypeFormGroupInput for create.
 */
type FxTransactionRateTypeFormGroupInput = IFxTransactionRateType | PartialWithRequiredKeyOf<NewFxTransactionRateType>;

type FxTransactionRateTypeFormDefaults = Pick<NewFxTransactionRateType, 'id'>;

type FxTransactionRateTypeFormGroupContent = {
  id: FormControl<IFxTransactionRateType['id'] | NewFxTransactionRateType['id']>;
  fxTransactionRateTypeCode: FormControl<IFxTransactionRateType['fxTransactionRateTypeCode']>;
  fxTransactionRateType: FormControl<IFxTransactionRateType['fxTransactionRateType']>;
  fxTransactionRateTypeDetails: FormControl<IFxTransactionRateType['fxTransactionRateTypeDetails']>;
};

export type FxTransactionRateTypeFormGroup = FormGroup<FxTransactionRateTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxTransactionRateTypeFormService {
  createFxTransactionRateTypeFormGroup(
    fxTransactionRateType: FxTransactionRateTypeFormGroupInput = { id: null }
  ): FxTransactionRateTypeFormGroup {
    const fxTransactionRateTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxTransactionRateType,
    };
    return new FormGroup<FxTransactionRateTypeFormGroupContent>({
      id: new FormControl(
        { value: fxTransactionRateTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fxTransactionRateTypeCode: new FormControl(fxTransactionRateTypeRawValue.fxTransactionRateTypeCode, {
        validators: [Validators.required],
      }),
      fxTransactionRateType: new FormControl(fxTransactionRateTypeRawValue.fxTransactionRateType, {
        validators: [Validators.required],
      }),
      fxTransactionRateTypeDetails: new FormControl(fxTransactionRateTypeRawValue.fxTransactionRateTypeDetails),
    });
  }

  getFxTransactionRateType(form: FxTransactionRateTypeFormGroup): IFxTransactionRateType | NewFxTransactionRateType {
    return form.getRawValue() as IFxTransactionRateType | NewFxTransactionRateType;
  }

  resetForm(form: FxTransactionRateTypeFormGroup, fxTransactionRateType: FxTransactionRateTypeFormGroupInput): void {
    const fxTransactionRateTypeRawValue = { ...this.getFormDefaults(), ...fxTransactionRateType };
    form.reset(
      {
        ...fxTransactionRateTypeRawValue,
        id: { value: fxTransactionRateTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxTransactionRateTypeFormDefaults {
    return {
      id: null,
    };
  }
}
