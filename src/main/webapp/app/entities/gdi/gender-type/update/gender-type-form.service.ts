import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IGenderType, NewGenderType } from '../gender-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IGenderType for edit and NewGenderTypeFormGroupInput for create.
 */
type GenderTypeFormGroupInput = IGenderType | PartialWithRequiredKeyOf<NewGenderType>;

type GenderTypeFormDefaults = Pick<NewGenderType, 'id'>;

type GenderTypeFormGroupContent = {
  id: FormControl<IGenderType['id'] | NewGenderType['id']>;
  genderCode: FormControl<IGenderType['genderCode']>;
  genderType: FormControl<IGenderType['genderType']>;
  genderDescription: FormControl<IGenderType['genderDescription']>;
};

export type GenderTypeFormGroup = FormGroup<GenderTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class GenderTypeFormService {
  createGenderTypeFormGroup(genderType: GenderTypeFormGroupInput = { id: null }): GenderTypeFormGroup {
    const genderTypeRawValue = {
      ...this.getFormDefaults(),
      ...genderType,
    };
    return new FormGroup<GenderTypeFormGroupContent>({
      id: new FormControl(
        { value: genderTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      genderCode: new FormControl(genderTypeRawValue.genderCode, {
        validators: [Validators.required],
      }),
      genderType: new FormControl(genderTypeRawValue.genderType, {
        validators: [Validators.required],
      }),
      genderDescription: new FormControl(genderTypeRawValue.genderDescription),
    });
  }

  getGenderType(form: GenderTypeFormGroup): IGenderType | NewGenderType {
    return form.getRawValue() as IGenderType | NewGenderType;
  }

  resetForm(form: GenderTypeFormGroup, genderType: GenderTypeFormGroupInput): void {
    const genderTypeRawValue = { ...this.getFormDefaults(), ...genderType };
    form.reset(
      {
        ...genderTypeRawValue,
        id: { value: genderTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): GenderTypeFormDefaults {
    return {
      id: null,
    };
  }
}
