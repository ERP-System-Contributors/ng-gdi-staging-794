import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbSourceOfInformationType, NewCrbSourceOfInformationType } from '../crb-source-of-information-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbSourceOfInformationType for edit and NewCrbSourceOfInformationTypeFormGroupInput for create.
 */
type CrbSourceOfInformationTypeFormGroupInput = ICrbSourceOfInformationType | PartialWithRequiredKeyOf<NewCrbSourceOfInformationType>;

type CrbSourceOfInformationTypeFormDefaults = Pick<NewCrbSourceOfInformationType, 'id'>;

type CrbSourceOfInformationTypeFormGroupContent = {
  id: FormControl<ICrbSourceOfInformationType['id'] | NewCrbSourceOfInformationType['id']>;
  sourceOfInformationTypeCode: FormControl<ICrbSourceOfInformationType['sourceOfInformationTypeCode']>;
  sourceOfInformationTypeDescription: FormControl<ICrbSourceOfInformationType['sourceOfInformationTypeDescription']>;
};

export type CrbSourceOfInformationTypeFormGroup = FormGroup<CrbSourceOfInformationTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbSourceOfInformationTypeFormService {
  createCrbSourceOfInformationTypeFormGroup(
    crbSourceOfInformationType: CrbSourceOfInformationTypeFormGroupInput = { id: null }
  ): CrbSourceOfInformationTypeFormGroup {
    const crbSourceOfInformationTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbSourceOfInformationType,
    };
    return new FormGroup<CrbSourceOfInformationTypeFormGroupContent>({
      id: new FormControl(
        { value: crbSourceOfInformationTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sourceOfInformationTypeCode: new FormControl(crbSourceOfInformationTypeRawValue.sourceOfInformationTypeCode, {
        validators: [Validators.required],
      }),
      sourceOfInformationTypeDescription: new FormControl(crbSourceOfInformationTypeRawValue.sourceOfInformationTypeDescription),
    });
  }

  getCrbSourceOfInformationType(form: CrbSourceOfInformationTypeFormGroup): ICrbSourceOfInformationType | NewCrbSourceOfInformationType {
    return form.getRawValue() as ICrbSourceOfInformationType | NewCrbSourceOfInformationType;
  }

  resetForm(form: CrbSourceOfInformationTypeFormGroup, crbSourceOfInformationType: CrbSourceOfInformationTypeFormGroupInput): void {
    const crbSourceOfInformationTypeRawValue = { ...this.getFormDefaults(), ...crbSourceOfInformationType };
    form.reset(
      {
        ...crbSourceOfInformationTypeRawValue,
        id: { value: crbSourceOfInformationTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbSourceOfInformationTypeFormDefaults {
    return {
      id: null,
    };
  }
}
