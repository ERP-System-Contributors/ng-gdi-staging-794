import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbNatureOfInformation, NewCrbNatureOfInformation } from '../crb-nature-of-information.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbNatureOfInformation for edit and NewCrbNatureOfInformationFormGroupInput for create.
 */
type CrbNatureOfInformationFormGroupInput = ICrbNatureOfInformation | PartialWithRequiredKeyOf<NewCrbNatureOfInformation>;

type CrbNatureOfInformationFormDefaults = Pick<NewCrbNatureOfInformation, 'id'>;

type CrbNatureOfInformationFormGroupContent = {
  id: FormControl<ICrbNatureOfInformation['id'] | NewCrbNatureOfInformation['id']>;
  natureOfInformationTypeCode: FormControl<ICrbNatureOfInformation['natureOfInformationTypeCode']>;
  natureOfInformationType: FormControl<ICrbNatureOfInformation['natureOfInformationType']>;
  natureOfInformationTypeDescription: FormControl<ICrbNatureOfInformation['natureOfInformationTypeDescription']>;
};

export type CrbNatureOfInformationFormGroup = FormGroup<CrbNatureOfInformationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbNatureOfInformationFormService {
  createCrbNatureOfInformationFormGroup(
    crbNatureOfInformation: CrbNatureOfInformationFormGroupInput = { id: null }
  ): CrbNatureOfInformationFormGroup {
    const crbNatureOfInformationRawValue = {
      ...this.getFormDefaults(),
      ...crbNatureOfInformation,
    };
    return new FormGroup<CrbNatureOfInformationFormGroupContent>({
      id: new FormControl(
        { value: crbNatureOfInformationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      natureOfInformationTypeCode: new FormControl(crbNatureOfInformationRawValue.natureOfInformationTypeCode, {
        validators: [Validators.required],
      }),
      natureOfInformationType: new FormControl(crbNatureOfInformationRawValue.natureOfInformationType, {
        validators: [Validators.required],
      }),
      natureOfInformationTypeDescription: new FormControl(crbNatureOfInformationRawValue.natureOfInformationTypeDescription),
    });
  }

  getCrbNatureOfInformation(form: CrbNatureOfInformationFormGroup): ICrbNatureOfInformation | NewCrbNatureOfInformation {
    return form.getRawValue() as ICrbNatureOfInformation | NewCrbNatureOfInformation;
  }

  resetForm(form: CrbNatureOfInformationFormGroup, crbNatureOfInformation: CrbNatureOfInformationFormGroupInput): void {
    const crbNatureOfInformationRawValue = { ...this.getFormDefaults(), ...crbNatureOfInformation };
    form.reset(
      {
        ...crbNatureOfInformationRawValue,
        id: { value: crbNatureOfInformationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbNatureOfInformationFormDefaults {
    return {
      id: null,
    };
  }
}
