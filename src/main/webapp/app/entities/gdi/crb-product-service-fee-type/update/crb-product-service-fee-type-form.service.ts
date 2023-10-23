import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbProductServiceFeeType, NewCrbProductServiceFeeType } from '../crb-product-service-fee-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbProductServiceFeeType for edit and NewCrbProductServiceFeeTypeFormGroupInput for create.
 */
type CrbProductServiceFeeTypeFormGroupInput = ICrbProductServiceFeeType | PartialWithRequiredKeyOf<NewCrbProductServiceFeeType>;

type CrbProductServiceFeeTypeFormDefaults = Pick<NewCrbProductServiceFeeType, 'id'>;

type CrbProductServiceFeeTypeFormGroupContent = {
  id: FormControl<ICrbProductServiceFeeType['id'] | NewCrbProductServiceFeeType['id']>;
  chargeTypeCode: FormControl<ICrbProductServiceFeeType['chargeTypeCode']>;
  chargeTypeDescription: FormControl<ICrbProductServiceFeeType['chargeTypeDescription']>;
  chargeTypeCategory: FormControl<ICrbProductServiceFeeType['chargeTypeCategory']>;
};

export type CrbProductServiceFeeTypeFormGroup = FormGroup<CrbProductServiceFeeTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbProductServiceFeeTypeFormService {
  createCrbProductServiceFeeTypeFormGroup(
    crbProductServiceFeeType: CrbProductServiceFeeTypeFormGroupInput = { id: null }
  ): CrbProductServiceFeeTypeFormGroup {
    const crbProductServiceFeeTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbProductServiceFeeType,
    };
    return new FormGroup<CrbProductServiceFeeTypeFormGroupContent>({
      id: new FormControl(
        { value: crbProductServiceFeeTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      chargeTypeCode: new FormControl(crbProductServiceFeeTypeRawValue.chargeTypeCode, {
        validators: [Validators.required],
      }),
      chargeTypeDescription: new FormControl(crbProductServiceFeeTypeRawValue.chargeTypeDescription),
      chargeTypeCategory: new FormControl(crbProductServiceFeeTypeRawValue.chargeTypeCategory, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbProductServiceFeeType(form: CrbProductServiceFeeTypeFormGroup): ICrbProductServiceFeeType | NewCrbProductServiceFeeType {
    return form.getRawValue() as ICrbProductServiceFeeType | NewCrbProductServiceFeeType;
  }

  resetForm(form: CrbProductServiceFeeTypeFormGroup, crbProductServiceFeeType: CrbProductServiceFeeTypeFormGroupInput): void {
    const crbProductServiceFeeTypeRawValue = { ...this.getFormDefaults(), ...crbProductServiceFeeType };
    form.reset(
      {
        ...crbProductServiceFeeTypeRawValue,
        id: { value: crbProductServiceFeeTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbProductServiceFeeTypeFormDefaults {
    return {
      id: null,
    };
  }
}
