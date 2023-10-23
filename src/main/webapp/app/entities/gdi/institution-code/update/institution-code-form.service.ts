import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInstitutionCode, NewInstitutionCode } from '../institution-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInstitutionCode for edit and NewInstitutionCodeFormGroupInput for create.
 */
type InstitutionCodeFormGroupInput = IInstitutionCode | PartialWithRequiredKeyOf<NewInstitutionCode>;

type InstitutionCodeFormDefaults = Pick<NewInstitutionCode, 'id' | 'placeholders'>;

type InstitutionCodeFormGroupContent = {
  id: FormControl<IInstitutionCode['id'] | NewInstitutionCode['id']>;
  institutionCode: FormControl<IInstitutionCode['institutionCode']>;
  institutionName: FormControl<IInstitutionCode['institutionName']>;
  shortName: FormControl<IInstitutionCode['shortName']>;
  category: FormControl<IInstitutionCode['category']>;
  institutionCategory: FormControl<IInstitutionCode['institutionCategory']>;
  institutionOwnership: FormControl<IInstitutionCode['institutionOwnership']>;
  dateLicensed: FormControl<IInstitutionCode['dateLicensed']>;
  institutionStatus: FormControl<IInstitutionCode['institutionStatus']>;
  placeholders: FormControl<IInstitutionCode['placeholders']>;
};

export type InstitutionCodeFormGroup = FormGroup<InstitutionCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InstitutionCodeFormService {
  createInstitutionCodeFormGroup(institutionCode: InstitutionCodeFormGroupInput = { id: null }): InstitutionCodeFormGroup {
    const institutionCodeRawValue = {
      ...this.getFormDefaults(),
      ...institutionCode,
    };
    return new FormGroup<InstitutionCodeFormGroupContent>({
      id: new FormControl(
        { value: institutionCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      institutionCode: new FormControl(institutionCodeRawValue.institutionCode, {
        validators: [Validators.required],
      }),
      institutionName: new FormControl(institutionCodeRawValue.institutionName, {
        validators: [Validators.required],
      }),
      shortName: new FormControl(institutionCodeRawValue.shortName),
      category: new FormControl(institutionCodeRawValue.category),
      institutionCategory: new FormControl(institutionCodeRawValue.institutionCategory),
      institutionOwnership: new FormControl(institutionCodeRawValue.institutionOwnership),
      dateLicensed: new FormControl(institutionCodeRawValue.dateLicensed),
      institutionStatus: new FormControl(institutionCodeRawValue.institutionStatus),
      placeholders: new FormControl(institutionCodeRawValue.placeholders ?? []),
    });
  }

  getInstitutionCode(form: InstitutionCodeFormGroup): IInstitutionCode | NewInstitutionCode {
    return form.getRawValue() as IInstitutionCode | NewInstitutionCode;
  }

  resetForm(form: InstitutionCodeFormGroup, institutionCode: InstitutionCodeFormGroupInput): void {
    const institutionCodeRawValue = { ...this.getFormDefaults(), ...institutionCode };
    form.reset(
      {
        ...institutionCodeRawValue,
        id: { value: institutionCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InstitutionCodeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
