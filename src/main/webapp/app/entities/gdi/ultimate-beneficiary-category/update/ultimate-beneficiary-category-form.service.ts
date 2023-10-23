import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUltimateBeneficiaryCategory, NewUltimateBeneficiaryCategory } from '../ultimate-beneficiary-category.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUltimateBeneficiaryCategory for edit and NewUltimateBeneficiaryCategoryFormGroupInput for create.
 */
type UltimateBeneficiaryCategoryFormGroupInput = IUltimateBeneficiaryCategory | PartialWithRequiredKeyOf<NewUltimateBeneficiaryCategory>;

type UltimateBeneficiaryCategoryFormDefaults = Pick<NewUltimateBeneficiaryCategory, 'id'>;

type UltimateBeneficiaryCategoryFormGroupContent = {
  id: FormControl<IUltimateBeneficiaryCategory['id'] | NewUltimateBeneficiaryCategory['id']>;
  ultimateBeneficiaryCategoryTypeCode: FormControl<IUltimateBeneficiaryCategory['ultimateBeneficiaryCategoryTypeCode']>;
  ultimateBeneficiaryType: FormControl<IUltimateBeneficiaryCategory['ultimateBeneficiaryType']>;
  ultimateBeneficiaryCategoryTypeDetails: FormControl<IUltimateBeneficiaryCategory['ultimateBeneficiaryCategoryTypeDetails']>;
};

export type UltimateBeneficiaryCategoryFormGroup = FormGroup<UltimateBeneficiaryCategoryFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UltimateBeneficiaryCategoryFormService {
  createUltimateBeneficiaryCategoryFormGroup(
    ultimateBeneficiaryCategory: UltimateBeneficiaryCategoryFormGroupInput = { id: null }
  ): UltimateBeneficiaryCategoryFormGroup {
    const ultimateBeneficiaryCategoryRawValue = {
      ...this.getFormDefaults(),
      ...ultimateBeneficiaryCategory,
    };
    return new FormGroup<UltimateBeneficiaryCategoryFormGroupContent>({
      id: new FormControl(
        { value: ultimateBeneficiaryCategoryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      ultimateBeneficiaryCategoryTypeCode: new FormControl(ultimateBeneficiaryCategoryRawValue.ultimateBeneficiaryCategoryTypeCode, {
        validators: [Validators.required],
      }),
      ultimateBeneficiaryType: new FormControl(ultimateBeneficiaryCategoryRawValue.ultimateBeneficiaryType, {
        validators: [Validators.required],
      }),
      ultimateBeneficiaryCategoryTypeDetails: new FormControl(ultimateBeneficiaryCategoryRawValue.ultimateBeneficiaryCategoryTypeDetails),
    });
  }

  getUltimateBeneficiaryCategory(
    form: UltimateBeneficiaryCategoryFormGroup
  ): IUltimateBeneficiaryCategory | NewUltimateBeneficiaryCategory {
    return form.getRawValue() as IUltimateBeneficiaryCategory | NewUltimateBeneficiaryCategory;
  }

  resetForm(form: UltimateBeneficiaryCategoryFormGroup, ultimateBeneficiaryCategory: UltimateBeneficiaryCategoryFormGroupInput): void {
    const ultimateBeneficiaryCategoryRawValue = { ...this.getFormDefaults(), ...ultimateBeneficiaryCategory };
    form.reset(
      {
        ...ultimateBeneficiaryCategoryRawValue,
        id: { value: ultimateBeneficiaryCategoryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UltimateBeneficiaryCategoryFormDefaults {
    return {
      id: null,
    };
  }
}
