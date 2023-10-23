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

import { ICrbComplaintType, NewCrbComplaintType } from '../crb-complaint-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbComplaintType for edit and NewCrbComplaintTypeFormGroupInput for create.
 */
type CrbComplaintTypeFormGroupInput = ICrbComplaintType | PartialWithRequiredKeyOf<NewCrbComplaintType>;

type CrbComplaintTypeFormDefaults = Pick<NewCrbComplaintType, 'id'>;

type CrbComplaintTypeFormGroupContent = {
  id: FormControl<ICrbComplaintType['id'] | NewCrbComplaintType['id']>;
  complaintTypeCode: FormControl<ICrbComplaintType['complaintTypeCode']>;
  complaintType: FormControl<ICrbComplaintType['complaintType']>;
  complaintTypeDetails: FormControl<ICrbComplaintType['complaintTypeDetails']>;
};

export type CrbComplaintTypeFormGroup = FormGroup<CrbComplaintTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbComplaintTypeFormService {
  createCrbComplaintTypeFormGroup(crbComplaintType: CrbComplaintTypeFormGroupInput = { id: null }): CrbComplaintTypeFormGroup {
    const crbComplaintTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbComplaintType,
    };
    return new FormGroup<CrbComplaintTypeFormGroupContent>({
      id: new FormControl(
        { value: crbComplaintTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      complaintTypeCode: new FormControl(crbComplaintTypeRawValue.complaintTypeCode, {
        validators: [Validators.required],
      }),
      complaintType: new FormControl(crbComplaintTypeRawValue.complaintType, {
        validators: [Validators.required],
      }),
      complaintTypeDetails: new FormControl(crbComplaintTypeRawValue.complaintTypeDetails),
    });
  }

  getCrbComplaintType(form: CrbComplaintTypeFormGroup): ICrbComplaintType | NewCrbComplaintType {
    return form.getRawValue() as ICrbComplaintType | NewCrbComplaintType;
  }

  resetForm(form: CrbComplaintTypeFormGroup, crbComplaintType: CrbComplaintTypeFormGroupInput): void {
    const crbComplaintTypeRawValue = { ...this.getFormDefaults(), ...crbComplaintType };
    form.reset(
      {
        ...crbComplaintTypeRawValue,
        id: { value: crbComplaintTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbComplaintTypeFormDefaults {
    return {
      id: null,
    };
  }
}
