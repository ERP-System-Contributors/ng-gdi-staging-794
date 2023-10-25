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

import { ICrbSourceOfInformationType, NewCrbSourceOfInformationType } from '../crb-source-of-information-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbSourceOfInformationType for edit and NewCrbSourceOfInformationTypeFormGroupInput for create.
 */
type CrbSourceOfInformationTypeFormGroupInput = ICrbSourceOfInformationType | PartialWithRequiredKeyOf<NewCrbSourceOfInformationType>;

type CrbSourceOfInformationTypeFormDefaults = Pick<NewCrbSourceOfInformationType, 'id'>;

type CrbSourceOfInformationTypeFormGroupContent = {
  id: FormControl<ICrbSourceOfInformationType['id'] | NewCrbSourceOfInformationType['id']>;
  sourceOfInformationTypeCode: FormControl<ICrbSourceOfInformationType['sourceOfInformationTypeCode']>;
  sourceOfInformationTypeDescription: FormControl<ICrbSourceOfInformationType['sourceOfInformationTypeDescription']>;
};

export type CrbSourceOfInformationTypeFormGroup = FormGroup<CrbSourceOfInformationTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbSourceOfInformationTypeFormService {
  createCrbSourceOfInformationTypeFormGroup(
    crbSourceOfInformationType: CrbSourceOfInformationTypeFormGroupInput = { id: null }
  ): CrbSourceOfInformationTypeFormGroup {
    const crbSourceOfInformationTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbSourceOfInformationType,
    };
    return new FormGroup<CrbSourceOfInformationTypeFormGroupContent>({
      id: new FormControl(
        { value: crbSourceOfInformationTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      sourceOfInformationTypeCode: new FormControl(crbSourceOfInformationTypeRawValue.sourceOfInformationTypeCode, {
        validators: [Validators.required],
      }),
      sourceOfInformationTypeDescription: new FormControl(crbSourceOfInformationTypeRawValue.sourceOfInformationTypeDescription),
    });
  }

  getCrbSourceOfInformationType(form: CrbSourceOfInformationTypeFormGroup): ICrbSourceOfInformationType | NewCrbSourceOfInformationType {
    return form.getRawValue() as ICrbSourceOfInformationType | NewCrbSourceOfInformationType;
  }

  resetForm(form: CrbSourceOfInformationTypeFormGroup, crbSourceOfInformationType: CrbSourceOfInformationTypeFormGroupInput): void {
    const crbSourceOfInformationTypeRawValue = { ...this.getFormDefaults(), ...crbSourceOfInformationType };
    form.reset(
      {
        ...crbSourceOfInformationTypeRawValue,
        id: { value: crbSourceOfInformationTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbSourceOfInformationTypeFormDefaults {
    return {
      id: null,
    };
  }
}
