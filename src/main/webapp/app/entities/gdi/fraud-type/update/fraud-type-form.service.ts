import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IFraudType, NewFraudType } from '../fraud-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFraudType for edit and NewFraudTypeFormGroupInput for create.
 */
type FraudTypeFormGroupInput = IFraudType | PartialWithRequiredKeyOf<NewFraudType>;

type FraudTypeFormDefaults = Pick<NewFraudType, 'id'>;

type FraudTypeFormGroupContent = {
  id: FormControl<IFraudType['id'] | NewFraudType['id']>;
  fraudTypeCode: FormControl<IFraudType['fraudTypeCode']>;
  fraudType: FormControl<IFraudType['fraudType']>;
  fraudTypeDetails: FormControl<IFraudType['fraudTypeDetails']>;
};

export type FraudTypeFormGroup = FormGroup<FraudTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FraudTypeFormService {
  createFraudTypeFormGroup(fraudType: FraudTypeFormGroupInput = { id: null }): FraudTypeFormGroup {
    const fraudTypeRawValue = {
      ...this.getFormDefaults(),
      ...fraudType,
    };
    return new FormGroup<FraudTypeFormGroupContent>({
      id: new FormControl(
        { value: fraudTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      fraudTypeCode: new FormControl(fraudTypeRawValue.fraudTypeCode, {
        validators: [Validators.required],
      }),
      fraudType: new FormControl(fraudTypeRawValue.fraudType, {
        validators: [Validators.required],
      }),
      fraudTypeDetails: new FormControl(fraudTypeRawValue.fraudTypeDetails),
    });
  }

  getFraudType(form: FraudTypeFormGroup): IFraudType | NewFraudType {
    return form.getRawValue() as IFraudType | NewFraudType;
  }

  resetForm(form: FraudTypeFormGroup, fraudType: FraudTypeFormGroupInput): void {
    const fraudTypeRawValue = { ...this.getFormDefaults(), ...fraudType };
    form.reset(
      {
        ...fraudTypeRawValue,
        id: { value: fraudTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FraudTypeFormDefaults {
    return {
      id: null,
    };
  }
}
