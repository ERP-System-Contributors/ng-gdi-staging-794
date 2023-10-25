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

import { IDepartmentType, NewDepartmentType } from '../department-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDepartmentType for edit and NewDepartmentTypeFormGroupInput for create.
 */
type DepartmentTypeFormGroupInput = IDepartmentType | PartialWithRequiredKeyOf<NewDepartmentType>;

type DepartmentTypeFormDefaults = Pick<NewDepartmentType, 'id' | 'placeholders'>;

type DepartmentTypeFormGroupContent = {
  id: FormControl<IDepartmentType['id'] | NewDepartmentType['id']>;
  departmentTypeCode: FormControl<IDepartmentType['departmentTypeCode']>;
  departmentType: FormControl<IDepartmentType['departmentType']>;
  departmentTypeDetails: FormControl<IDepartmentType['departmentTypeDetails']>;
  placeholders: FormControl<IDepartmentType['placeholders']>;
};

export type DepartmentTypeFormGroup = FormGroup<DepartmentTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DepartmentTypeFormService {
  createDepartmentTypeFormGroup(departmentType: DepartmentTypeFormGroupInput = { id: null }): DepartmentTypeFormGroup {
    const departmentTypeRawValue = {
      ...this.getFormDefaults(),
      ...departmentType,
    };
    return new FormGroup<DepartmentTypeFormGroupContent>({
      id: new FormControl(
        { value: departmentTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      departmentTypeCode: new FormControl(departmentTypeRawValue.departmentTypeCode, {
        validators: [Validators.required],
      }),
      departmentType: new FormControl(departmentTypeRawValue.departmentType, {
        validators: [Validators.required],
      }),
      departmentTypeDetails: new FormControl(departmentTypeRawValue.departmentTypeDetails),
      placeholders: new FormControl(departmentTypeRawValue.placeholders ?? []),
    });
  }

  getDepartmentType(form: DepartmentTypeFormGroup): IDepartmentType | NewDepartmentType {
    return form.getRawValue() as IDepartmentType | NewDepartmentType;
  }

  resetForm(form: DepartmentTypeFormGroup, departmentType: DepartmentTypeFormGroupInput): void {
    const departmentTypeRawValue = { ...this.getFormDefaults(), ...departmentType };
    form.reset(
      {
        ...departmentTypeRawValue,
        id: { value: departmentTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DepartmentTypeFormDefaults {
    return {
      id: null,
      placeholders: [],
    };
  }
}
