import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbSubmittingInstitutionCategory, NewCrbSubmittingInstitutionCategory } from '../crb-submitting-institution-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbSubmittingInstitutionCategory for edit and NewCrbSubmittingInstitutionCategoryFormGroupInput for create.
 */
type CrbSubmittingInstitutionCategoryFormGroupInput =
  | ICrbSubmittingInstitutionCategory
  | PartialWithRequiredKeyOf<NewCrbSubmittingInstitutionCategory>;

type CrbSubmittingInstitutionCategoryFormDefaults = Pick<NewCrbSubmittingInstitutionCategory, 'id'>;

type CrbSubmittingInstitutionCategoryFormGroupContent = {
  id: FormControl<ICrbSubmittingInstitutionCategory['id'] | NewCrbSubmittingInstitutionCategory['id']>;
  submittingInstitutionCategoryTypeCode: FormControl<ICrbSubmittingInstitutionCategory['submittingInstitutionCategoryTypeCode']>;
  submittingInstitutionCategoryType: FormControl<ICrbSubmittingInstitutionCategory['submittingInstitutionCategoryType']>;
  submittingInstitutionCategoryDetails: FormControl<ICrbSubmittingInstitutionCategory['submittingInstitutionCategoryDetails']>;
};

export type CrbSubmittingInstitutionCategoryFormGroup = FormGroup<CrbSubmittingInstitutionCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbSubmittingInstitutionCategoryFormService {
  createCrbSubmittingInstitutionCategoryFormGroup(
    crbSubmittingInstitutionCategory: CrbSubmittingInstitutionCategoryFormGroupInput = { id: null }
  ): CrbSubmittingInstitutionCategoryFormGroup {
    const crbSubmittingInstitutionCategoryRawValue = {
      ...this.getFormDefaults(),
      ...crbSubmittingInstitutionCategory,
    };
    return new FormGroup<CrbSubmittingInstitutionCategoryFormGroupContent>({
      id: new FormControl(
        { value: crbSubmittingInstitutionCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      submittingInstitutionCategoryTypeCode: new FormControl(
        crbSubmittingInstitutionCategoryRawValue.submittingInstitutionCategoryTypeCode,
        {
          validators: [Validators.required],
        }
      ),
      submittingInstitutionCategoryType: new FormControl(crbSubmittingInstitutionCategoryRawValue.submittingInstitutionCategoryType, {
        validators: [Validators.required],
      }),
      submittingInstitutionCategoryDetails: new FormControl(crbSubmittingInstitutionCategoryRawValue.submittingInstitutionCategoryDetails),
    });
  }

  getCrbSubmittingInstitutionCategory(
    form: CrbSubmittingInstitutionCategoryFormGroup
  ): ICrbSubmittingInstitutionCategory | NewCrbSubmittingInstitutionCategory {
    return form.getRawValue() as ICrbSubmittingInstitutionCategory | NewCrbSubmittingInstitutionCategory;
  }

  resetForm(
    form: CrbSubmittingInstitutionCategoryFormGroup,
    crbSubmittingInstitutionCategory: CrbSubmittingInstitutionCategoryFormGroupInput
  ): void {
    const crbSubmittingInstitutionCategoryRawValue = { ...this.getFormDefaults(), ...crbSubmittingInstitutionCategory };
    form.reset(
      {
        ...crbSubmittingInstitutionCategoryRawValue,
        id: { value: crbSubmittingInstitutionCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbSubmittingInstitutionCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
