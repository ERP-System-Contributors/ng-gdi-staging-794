///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
