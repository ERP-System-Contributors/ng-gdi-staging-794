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

import { IInsiderCategoryTypes, NewInsiderCategoryTypes } from '../insider-category-types.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInsiderCategoryTypes for edit and NewInsiderCategoryTypesFormGroupInput for create.
 */
type InsiderCategoryTypesFormGroupInput = IInsiderCategoryTypes | PartialWithRequiredKeyOf<NewInsiderCategoryTypes>;

type InsiderCategoryTypesFormDefaults = Pick<NewInsiderCategoryTypes, 'id'>;

type InsiderCategoryTypesFormGroupContent = {
  id: FormControl<IInsiderCategoryTypes['id'] | NewInsiderCategoryTypes['id']>;
  insiderCategoryTypeCode: FormControl<IInsiderCategoryTypes['insiderCategoryTypeCode']>;
  insiderCategoryTypeDetail: FormControl<IInsiderCategoryTypes['insiderCategoryTypeDetail']>;
  insiderCategoryDescription: FormControl<IInsiderCategoryTypes['insiderCategoryDescription']>;
};

export type InsiderCategoryTypesFormGroup = FormGroup<InsiderCategoryTypesFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InsiderCategoryTypesFormService {
  createInsiderCategoryTypesFormGroup(
    insiderCategoryTypes: InsiderCategoryTypesFormGroupInput = { id: null }
  ): InsiderCategoryTypesFormGroup {
    const insiderCategoryTypesRawValue = {
      ...this.getFormDefaults(),
      ...insiderCategoryTypes,
    };
    return new FormGroup<InsiderCategoryTypesFormGroupContent>({
      id: new FormControl(
        { value: insiderCategoryTypesRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      insiderCategoryTypeCode: new FormControl(insiderCategoryTypesRawValue.insiderCategoryTypeCode, {
        validators: [Validators.required],
      }),
      insiderCategoryTypeDetail: new FormControl(insiderCategoryTypesRawValue.insiderCategoryTypeDetail, {
        validators: [Validators.required],
      }),
      insiderCategoryDescription: new FormControl(insiderCategoryTypesRawValue.insiderCategoryDescription),
    });
  }

  getInsiderCategoryTypes(form: InsiderCategoryTypesFormGroup): IInsiderCategoryTypes | NewInsiderCategoryTypes {
    return form.getRawValue() as IInsiderCategoryTypes | NewInsiderCategoryTypes;
  }

  resetForm(form: InsiderCategoryTypesFormGroup, insiderCategoryTypes: InsiderCategoryTypesFormGroupInput): void {
    const insiderCategoryTypesRawValue = { ...this.getFormDefaults(), ...insiderCategoryTypes };
    form.reset(
      {
        ...insiderCategoryTypesRawValue,
        id: { value: insiderCategoryTypesRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InsiderCategoryTypesFormDefaults {
    return {
      id: null,
    };
  }
}
