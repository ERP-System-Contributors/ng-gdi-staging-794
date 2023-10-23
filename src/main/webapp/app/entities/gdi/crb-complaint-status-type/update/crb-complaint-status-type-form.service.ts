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

import { ICrbComplaintStatusType, NewCrbComplaintStatusType } from '../crb-complaint-status-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbComplaintStatusType for edit and NewCrbComplaintStatusTypeFormGroupInput for create.
 */
type CrbComplaintStatusTypeFormGroupInput = ICrbComplaintStatusType | PartialWithRequiredKeyOf<NewCrbComplaintStatusType>;

type CrbComplaintStatusTypeFormDefaults = Pick<NewCrbComplaintStatusType, 'id'>;

type CrbComplaintStatusTypeFormGroupContent = {
  id: FormControl<ICrbComplaintStatusType['id'] | NewCrbComplaintStatusType['id']>;
  complaintStatusTypeCode: FormControl<ICrbComplaintStatusType['complaintStatusTypeCode']>;
  complaintStatusType: FormControl<ICrbComplaintStatusType['complaintStatusType']>;
  complaintStatusDetails: FormControl<ICrbComplaintStatusType['complaintStatusDetails']>;
};

export type CrbComplaintStatusTypeFormGroup = FormGroup<CrbComplaintStatusTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbComplaintStatusTypeFormService {
  createCrbComplaintStatusTypeFormGroup(
    crbComplaintStatusType: CrbComplaintStatusTypeFormGroupInput = { id: null }
  ): CrbComplaintStatusTypeFormGroup {
    const crbComplaintStatusTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbComplaintStatusType,
    };
    return new FormGroup<CrbComplaintStatusTypeFormGroupContent>({
      id: new FormControl(
        { value: crbComplaintStatusTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      complaintStatusTypeCode: new FormControl(crbComplaintStatusTypeRawValue.complaintStatusTypeCode, {
        validators: [Validators.required],
      }),
      complaintStatusType: new FormControl(crbComplaintStatusTypeRawValue.complaintStatusType, {
        validators: [Validators.required],
      }),
      complaintStatusDetails: new FormControl(crbComplaintStatusTypeRawValue.complaintStatusDetails),
    });
  }

  getCrbComplaintStatusType(form: CrbComplaintStatusTypeFormGroup): ICrbComplaintStatusType | NewCrbComplaintStatusType {
    return form.getRawValue() as ICrbComplaintStatusType | NewCrbComplaintStatusType;
  }

  resetForm(form: CrbComplaintStatusTypeFormGroup, crbComplaintStatusType: CrbComplaintStatusTypeFormGroupInput): void {
    const crbComplaintStatusTypeRawValue = { ...this.getFormDefaults(), ...crbComplaintStatusType };
    form.reset(
      {
        ...crbComplaintStatusTypeRawValue,
        id: { value: crbComplaintStatusTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbComplaintStatusTypeFormDefaults {
    return {
      id: null,
    };
  }
}
