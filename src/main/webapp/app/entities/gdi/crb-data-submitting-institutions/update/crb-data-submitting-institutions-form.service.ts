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
