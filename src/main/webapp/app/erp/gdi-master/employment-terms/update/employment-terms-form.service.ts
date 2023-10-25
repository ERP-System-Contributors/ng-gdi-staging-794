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

import { IEmploymentTerms, NewEmploymentTerms } from '../employment-terms.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IEmploymentTerms for edit and NewEmploymentTermsFormGroupInput for create.
 */
type EmploymentTermsFormGroupInput = IEmploymentTerms | PartialWithRequiredKeyOf<NewEmploymentTerms>;

type EmploymentTermsFormDefaults = Pick<NewEmploymentTerms, 'id'>;

type EmploymentTermsFormGroupContent = {
  id: FormControl<IEmploymentTerms['id'] | NewEmploymentTerms['id']>;
  employmentTermsCode: FormControl<IEmploymentTerms['employmentTermsCode']>;
  employmentTermsStatus: FormControl<IEmploymentTerms['employmentTermsStatus']>;
};

export type EmploymentTermsFormGroup = FormGroup<EmploymentTermsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class EmploymentTermsFormService {
  createEmploymentTermsFormGroup(employmentTerms: EmploymentTermsFormGroupInput = { id: null }): EmploymentTermsFormGroup {
    const employmentTermsRawValue = {
      ...this.getFormDefaults(),
      ...employmentTerms,
    };
    return new FormGroup<EmploymentTermsFormGroupContent>({
      id: new FormControl(
        { value: employmentTermsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      employmentTermsCode: new FormControl(employmentTermsRawValue.employmentTermsCode, {
        validators: [Validators.required],
      }),
      employmentTermsStatus: new FormControl(employmentTermsRawValue.employmentTermsStatus, {
        validators: [Validators.required],
      }),
    });
  }

  getEmploymentTerms(form: EmploymentTermsFormGroup): IEmploymentTerms | NewEmploymentTerms {
    return form.getRawValue() as IEmploymentTerms | NewEmploymentTerms;
  }

  resetForm(form: EmploymentTermsFormGroup, employmentTerms: EmploymentTermsFormGroupInput): void {
    const employmentTermsRawValue = { ...this.getFormDefaults(), ...employmentTerms };
    form.reset(
      {
        ...employmentTermsRawValue,
        id: { value: employmentTermsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): EmploymentTermsFormDefaults {
    return {
      id: null,
    };
  }
}
