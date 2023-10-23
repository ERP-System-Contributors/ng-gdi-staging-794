import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFxTransactionType, NewFxTransactionType } from '../fx-transaction-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxTransactionType for edit and NewFxTransactionTypeFormGroupInput for create.
 */
type FxTransactionTypeFormGroupInput = IFxTransactionType | PartialWithRequiredKeyOf<NewFxTransactionType>;

type FxTransactionTypeFormDefaults = Pick<NewFxTransactionType, 'id'>;

type FxTransactionTypeFormGroupContent = {
  id: FormControl<IFxTransactionType['id'] | NewFxTransactionType['id']>;
  fxTransactionTypeCode: FormControl<IFxTransactionType['fxTransactionTypeCode']>;
  fxTransactionType: FormControl<IFxTransactionType['fxTransactionType']>;
  fxTransactionTypeDescription: FormControl<IFxTransactionType['fxTransactionTypeDescription']>;
};

export type FxTransactionTypeFormGroup = FormGroup<FxTransactionTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxTransactionTypeFormService {
  createFxTransactionTypeFormGroup(fxTransactionType: FxTransactionTypeFormGroupInput = { id: null }): FxTransactionTypeFormGroup {
    const fxTransactionTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxTransactionType,
    };
    return new FormGroup<FxTransactionTypeFormGroupContent>({
      id: new FormControl(
        { value: fxTransactionTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fxTransactionTypeCode: new FormControl(fxTransactionTypeRawValue.fxTransactionTypeCode, {
        validators: [Validators.required],
      }),
      fxTransactionType: new FormControl(fxTransactionTypeRawValue.fxTransactionType, {
        validators: [Validators.required],
      }),
      fxTransactionTypeDescription: new FormControl(fxTransactionTypeRawValue.fxTransactionTypeDescription),
    });
  }

  getFxTransactionType(form: FxTransactionTypeFormGroup): IFxTransactionType | NewFxTransactionType {
    return form.getRawValue() as IFxTransactionType | NewFxTransactionType;
  }

  resetForm(form: FxTransactionTypeFormGroup, fxTransactionType: FxTransactionTypeFormGroupInput): void {
    const fxTransactionTypeRawValue = { ...this.getFormDefaults(), ...fxTransactionType };
    form.reset(
      {
        ...fxTransactionTypeRawValue,
        id: { value: fxTransactionTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxTransactionTypeFormDefaults {
    return {
      id: null,
    };
  }
}
