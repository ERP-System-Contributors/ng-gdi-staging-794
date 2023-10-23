import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbDataSubmittingInstitutions, NewCrbDataSubmittingInstitutions } from '../crb-data-submitting-institutions.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbDataSubmittingInstitutions for edit and NewCrbDataSubmittingInstitutionsFormGroupInput for create.
 */
type CrbDataSubmittingInstitutionsFormGroupInput =
  | ICrbDataSubmittingInstitutions
  | PartialWithRequiredKeyOf<NewCrbDataSubmittingInstitutions>;

type CrbDataSubmittingInstitutionsFormDefaults = Pick<NewCrbDataSubmittingInstitutions, 'id'>;

type CrbDataSubmittingInstitutionsFormGroupContent = {
  id: FormControl<ICrbDataSubmittingInstitutions['id'] | NewCrbDataSubmittingInstitutions['id']>;
  institutionCode: FormControl<ICrbDataSubmittingInstitutions['institutionCode']>;
  institutionName: FormControl<ICrbDataSubmittingInstitutions['institutionName']>;
  institutionCategory: FormControl<ICrbDataSubmittingInstitutions['institutionCategory']>;
};

export type CrbDataSubmittingInstitutionsFormGroup = FormGroup<CrbDataSubmittingInstitutionsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbDataSubmittingInstitutionsFormService {
  createCrbDataSubmittingInstitutionsFormGroup(
    crbDataSubmittingInstitutions: CrbDataSubmittingInstitutionsFormGroupInput = { id: null }
  ): CrbDataSubmittingInstitutionsFormGroup {
    const crbDataSubmittingInstitutionsRawValue = {
      ...this.getFormDefaults(),
      ...crbDataSubmittingInstitutions,
    };
    return new FormGroup<CrbDataSubmittingInstitutionsFormGroupContent>({
      id: new FormControl(
        { value: crbDataSubmittingInstitutionsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      institutionCode: new FormControl(crbDataSubmittingInstitutionsRawValue.institutionCode, {
        validators: [Validators.required],
      }),
      institutionName: new FormControl(crbDataSubmittingInstitutionsRawValue.institutionName, {
        validators: [Validators.required],
      }),
      institutionCategory: new FormControl(crbDataSubmittingInstitutionsRawValue.institutionCategory, {
        validators: [Validators.required],
      }),
    });
  }

  getCrbDataSubmittingInstitutions(
    form: CrbDataSubmittingInstitutionsFormGroup
  ): ICrbDataSubmittingInstitutions | NewCrbDataSubmittingInstitutions {
    return form.getRawValue() as ICrbDataSubmittingInstitutions | NewCrbDataSubmittingInstitutions;
  }

  resetForm(
    form: CrbDataSubmittingInstitutionsFormGroup,
    crbDataSubmittingInstitutions: CrbDataSubmittingInstitutionsFormGroupInput
  ): void {
    const crbDataSubmittingInstitutionsRawValue = { ...this.getFormDefaults(), ...crbDataSubmittingInstitutions };
    form.reset(
      {
        ...crbDataSubmittingInstitutionsRawValue,
        id: { value: crbDataSubmittingInstitutionsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbDataSubmittingInstitutionsFormDefaults {
    return {
      id: null,
    };
  }
}
