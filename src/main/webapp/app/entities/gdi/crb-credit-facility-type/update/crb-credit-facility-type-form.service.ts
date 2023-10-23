import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbCreditFacilityType, NewCrbCreditFacilityType } from '../crb-credit-facility-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbCreditFacilityType for edit and NewCrbCreditFacilityTypeFormGroupInput for create.
 */
type CrbCreditFacilityTypeFormGroupInput = ICrbCreditFacilityType | PartialWithRequiredKeyOf<NewCrbCreditFacilityType>;

type CrbCreditFacilityTypeFormDefaults = Pick<NewCrbCreditFacilityType, 'id'>;

type CrbCreditFacilityTypeFormGroupContent = {
  id: FormControl<ICrbCreditFacilityType['id'] | NewCrbCreditFacilityType['id']>;
  creditFacilityTypeCode: FormControl<ICrbCreditFacilityType['creditFacilityTypeCode']>;
  creditFacilityType: FormControl<ICrbCreditFacilityType['creditFacilityType']>;
  creditFacilityDescription: FormControl<ICrbCreditFacilityType['creditFacilityDescription']>;
};

export type CrbCreditFacilityTypeFormGroup = FormGroup<CrbCreditFacilityTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbCreditFacilityTypeFormService {
  createCrbCreditFacilityTypeFormGroup(
    crbCreditFacilityType: CrbCreditFacilityTypeFormGroupInput = { id: null }
  ): CrbCreditFacilityTypeFormGroup {
    const crbCreditFacilityTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbCreditFacilityType,
    };
    return new FormGroup<CrbCreditFacilityTypeFormGroupContent>({
      id: new FormControl(
        { value: crbCreditFacilityTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      creditFacilityTypeCode: new FormControl(crbCreditFacilityTypeRawValue.creditFacilityTypeCode, {
        validators: [Validators.required],
      }),
      creditFacilityType: new FormControl(crbCreditFacilityTypeRawValue.creditFacilityType, {
        validators: [Validators.required],
      }),
      creditFacilityDescription: new FormControl(crbCreditFacilityTypeRawValue.creditFacilityDescription),
    });
  }

  getCrbCreditFacilityType(form: CrbCreditFacilityTypeFormGroup): ICrbCreditFacilityType | NewCrbCreditFacilityType {
    return form.getRawValue() as ICrbCreditFacilityType | NewCrbCreditFacilityType;
  }

  resetForm(form: CrbCreditFacilityTypeFormGroup, crbCreditFacilityType: CrbCreditFacilityTypeFormGroupInput): void {
    const crbCreditFacilityTypeRawValue = { ...this.getFormDefaults(), ...crbCreditFacilityType };
    form.reset(
      {
        ...crbCreditFacilityTypeRawValue,
        id: { value: crbCreditFacilityTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbCreditFacilityTypeFormDefaults {
    return {
      id: null,
    };
  }
}
