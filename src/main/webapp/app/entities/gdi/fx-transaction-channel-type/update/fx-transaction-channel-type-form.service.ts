import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFxTransactionChannelType, NewFxTransactionChannelType } from '../fx-transaction-channel-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxTransactionChannelType for edit and NewFxTransactionChannelTypeFormGroupInput for create.
 */
type FxTransactionChannelTypeFormGroupInput = IFxTransactionChannelType | PartialWithRequiredKeyOf<NewFxTransactionChannelType>;

type FxTransactionChannelTypeFormDefaults = Pick<NewFxTransactionChannelType, 'id'>;

type FxTransactionChannelTypeFormGroupContent = {
  id: FormControl<IFxTransactionChannelType['id'] | NewFxTransactionChannelType['id']>;
  fxTransactionChannelCode: FormControl<IFxTransactionChannelType['fxTransactionChannelCode']>;
  fxTransactionChannelType: FormControl<IFxTransactionChannelType['fxTransactionChannelType']>;
  fxChannelTypeDetails: FormControl<IFxTransactionChannelType['fxChannelTypeDetails']>;
};

export type FxTransactionChannelTypeFormGroup = FormGroup<FxTransactionChannelTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxTransactionChannelTypeFormService {
  createFxTransactionChannelTypeFormGroup(
    fxTransactionChannelType: FxTransactionChannelTypeFormGroupInput = { id: null }
  ): FxTransactionChannelTypeFormGroup {
    const fxTransactionChannelTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxTransactionChannelType,
    };
    return new FormGroup<FxTransactionChannelTypeFormGroupContent>({
      id: new FormControl(
        { value: fxTransactionChannelTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fxTransactionChannelCode: new FormControl(fxTransactionChannelTypeRawValue.fxTransactionChannelCode, {
        validators: [Validators.required],
      }),
      fxTransactionChannelType: new FormControl(fxTransactionChannelTypeRawValue.fxTransactionChannelType, {
        validators: [Validators.required],
      }),
      fxChannelTypeDetails: new FormControl(fxTransactionChannelTypeRawValue.fxChannelTypeDetails),
    });
  }

  getFxTransactionChannelType(form: FxTransactionChannelTypeFormGroup): IFxTransactionChannelType | NewFxTransactionChannelType {
    return form.getRawValue() as IFxTransactionChannelType | NewFxTransactionChannelType;
  }

  resetForm(form: FxTransactionChannelTypeFormGroup, fxTransactionChannelType: FxTransactionChannelTypeFormGroupInput): void {
    const fxTransactionChannelTypeRawValue = { ...this.getFormDefaults(), ...fxTransactionChannelType };
    form.reset(
      {
        ...fxTransactionChannelTypeRawValue,
        id: { value: fxTransactionChannelTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxTransactionChannelTypeFormDefaults {
    return {
      id: null,
    };
  }
}
