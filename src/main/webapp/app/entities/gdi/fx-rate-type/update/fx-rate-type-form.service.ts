import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFxRateType, NewFxRateType } from '../fx-rate-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFxRateType for edit and NewFxRateTypeFormGroupInput for create.
 */
type FxRateTypeFormGroupInput = IFxRateType | PartialWithRequiredKeyOf<NewFxRateType>;

type FxRateTypeFormDefaults = Pick<NewFxRateType, 'id'>;

type FxRateTypeFormGroupContent = {
  id: FormControl<IFxRateType['id'] | NewFxRateType['id']>;
  fxRateCode: FormControl<IFxRateType['fxRateCode']>;
  fxRateType: FormControl<IFxRateType['fxRateType']>;
  fxRateDetails: FormControl<IFxRateType['fxRateDetails']>;
};

export type FxRateTypeFormGroup = FormGroup<FxRateTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FxRateTypeFormService {
  createFxRateTypeFormGroup(fxRateType: FxRateTypeFormGroupInput = { id: null }): FxRateTypeFormGroup {
    const fxRateTypeRawValue = {
      ...this.getFormDefaults(),
      ...fxRateType,
    };
    return new FormGroup<FxRateTypeFormGroupContent>({
      id: new FormControl(
        { value: fxRateTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fxRateCode: new FormControl(fxRateTypeRawValue.fxRateCode, {
        validators: [Validators.required],
      }),
      fxRateType: new FormControl(fxRateTypeRawValue.fxRateType, {
        validators: [Validators.required],
      }),
      fxRateDetails: new FormControl(fxRateTypeRawValue.fxRateDetails),
    });
  }

  getFxRateType(form: FxRateTypeFormGroup): IFxRateType | NewFxRateType {
    return form.getRawValue() as IFxRateType | NewFxRateType;
  }

  resetForm(form: FxRateTypeFormGroup, fxRateType: FxRateTypeFormGroupInput): void {
    const fxRateTypeRawValue = { ...this.getFormDefaults(), ...fxRateType };
    form.reset(
      {
        ...fxRateTypeRawValue,
        id: { value: fxRateTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FxRateTypeFormDefaults {
    return {
      id: null,
    };
  }
}
