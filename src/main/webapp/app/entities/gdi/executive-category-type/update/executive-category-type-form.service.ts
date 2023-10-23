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

import { IExecutiveCategoryType, NewExecutiveCategoryType } from '../executive-category-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IExecutiveCategoryType for edit and NewExecutiveCategoryTypeFormGroupInput for create.
 */
type ExecutiveCategoryTypeFormGroupInput = IExecutiveCategoryType | PartialWithRequiredKeyOf<NewExecutiveCategoryType>;

type ExecutiveCategoryTypeFormDefaults = Pick<NewExecutiveCategoryType, 'id'>;

type ExecutiveCategoryTypeFormGroupContent = {
  id: FormControl<IExecutiveCategoryType['id'] | NewExecutiveCategoryType['id']>;
  directorCategoryTypeCode: FormControl<IExecutiveCategoryType['directorCategoryTypeCode']>;
  directorCategoryType: FormControl<IExecutiveCategoryType['directorCategoryType']>;
  directorCategoryTypeDetails: FormControl<IExecutiveCategoryType['directorCategoryTypeDetails']>;
};

export type ExecutiveCategoryTypeFormGroup = FormGroup<ExecutiveCategoryTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ExecutiveCategoryTypeFormService {
  createExecutiveCategoryTypeFormGroup(
    executiveCategoryType: ExecutiveCategoryTypeFormGroupInput = { id: null }
  ): ExecutiveCategoryTypeFormGroup {
    const executiveCategoryTypeRawValue = {
      ...this.getFormDefaults(),
      ...executiveCategoryType,
    };
    return new FormGroup<ExecutiveCategoryTypeFormGroupContent>({
      id: new FormControl(
        { value: executiveCategoryTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      directorCategoryTypeCode: new FormControl(executiveCategoryTypeRawValue.directorCategoryTypeCode, {
        validators: [Validators.required],
      }),
      directorCategoryType: new FormControl(executiveCategoryTypeRawValue.directorCategoryType, {
        validators: [Validators.required],
      }),
      directorCategoryTypeDetails: new FormControl(executiveCategoryTypeRawValue.directorCategoryTypeDetails),
    });
  }

  getExecutiveCategoryType(form: ExecutiveCategoryTypeFormGroup): IExecutiveCategoryType | NewExecutiveCategoryType {
    return form.getRawValue() as IExecutiveCategoryType | NewExecutiveCategoryType;
  }

  resetForm(form: ExecutiveCategoryTypeFormGroup, executiveCategoryType: ExecutiveCategoryTypeFormGroupInput): void {
    const executiveCategoryTypeRawValue = { ...this.getFormDefaults(), ...executiveCategoryType };
    form.reset(
      {
        ...executiveCategoryTypeRawValue,
        id: { value: executiveCategoryTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ExecutiveCategoryTypeFormDefaults {
    return {
      id: null,
    };
  }
}
