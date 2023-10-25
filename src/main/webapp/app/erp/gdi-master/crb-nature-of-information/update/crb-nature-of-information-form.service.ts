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

import { ICrbNatureOfInformation, NewCrbNatureOfInformation } from '../crb-nature-of-information.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbNatureOfInformation for edit and NewCrbNatureOfInformationFormGroupInput for create.
 */
type CrbNatureOfInformationFormGroupInput = ICrbNatureOfInformation | PartialWithRequiredKeyOf<NewCrbNatureOfInformation>;

type CrbNatureOfInformationFormDefaults = Pick<NewCrbNatureOfInformation, 'id'>;

type CrbNatureOfInformationFormGroupContent = {
  id: FormControl<ICrbNatureOfInformation['id'] | NewCrbNatureOfInformation['id']>;
  natureOfInformationTypeCode: FormControl<ICrbNatureOfInformation['natureOfInformationTypeCode']>;
  natureOfInformationType: FormControl<ICrbNatureOfInformation['natureOfInformationType']>;
  natureOfInformationTypeDescription: FormControl<ICrbNatureOfInformation['natureOfInformationTypeDescription']>;
};

export type CrbNatureOfInformationFormGroup = FormGroup<CrbNatureOfInformationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbNatureOfInformationFormService {
  createCrbNatureOfInformationFormGroup(
    crbNatureOfInformation: CrbNatureOfInformationFormGroupInput = { id: null }
  ): CrbNatureOfInformationFormGroup {
    const crbNatureOfInformationRawValue = {
      ...this.getFormDefaults(),
      ...crbNatureOfInformation,
    };
    return new FormGroup<CrbNatureOfInformationFormGroupContent>({
      id: new FormControl(
        { value: crbNatureOfInformationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      natureOfInformationTypeCode: new FormControl(crbNatureOfInformationRawValue.natureOfInformationTypeCode, {
        validators: [Validators.required],
      }),
      natureOfInformationType: new FormControl(crbNatureOfInformationRawValue.natureOfInformationType, {
        validators: [Validators.required],
      }),
      natureOfInformationTypeDescription: new FormControl(crbNatureOfInformationRawValue.natureOfInformationTypeDescription),
    });
  }

  getCrbNatureOfInformation(form: CrbNatureOfInformationFormGroup): ICrbNatureOfInformation | NewCrbNatureOfInformation {
    return form.getRawValue() as ICrbNatureOfInformation | NewCrbNatureOfInformation;
  }

  resetForm(form: CrbNatureOfInformationFormGroup, crbNatureOfInformation: CrbNatureOfInformationFormGroupInput): void {
    const crbNatureOfInformationRawValue = { ...this.getFormDefaults(), ...crbNatureOfInformation };
    form.reset(
      {
        ...crbNatureOfInformationRawValue,
        id: { value: crbNatureOfInformationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbNatureOfInformationFormDefaults {
    return {
      id: null,
    };
  }
}
