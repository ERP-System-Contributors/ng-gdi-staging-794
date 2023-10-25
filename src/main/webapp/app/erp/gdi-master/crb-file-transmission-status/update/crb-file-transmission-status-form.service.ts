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

import { ICrbFileTransmissionStatus, NewCrbFileTransmissionStatus } from '../crb-file-transmission-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbFileTransmissionStatus for edit and NewCrbFileTransmissionStatusFormGroupInput for create.
 */
type CrbFileTransmissionStatusFormGroupInput = ICrbFileTransmissionStatus | PartialWithRequiredKeyOf<NewCrbFileTransmissionStatus>;

type CrbFileTransmissionStatusFormDefaults = Pick<NewCrbFileTransmissionStatus, 'id'>;

type CrbFileTransmissionStatusFormGroupContent = {
  id: FormControl<ICrbFileTransmissionStatus['id'] | NewCrbFileTransmissionStatus['id']>;
  submittedFileStatusTypeCode: FormControl<ICrbFileTransmissionStatus['submittedFileStatusTypeCode']>;
  submittedFileStatusType: FormControl<ICrbFileTransmissionStatus['submittedFileStatusType']>;
  submittedFileStatusTypeDescription: FormControl<ICrbFileTransmissionStatus['submittedFileStatusTypeDescription']>;
};

export type CrbFileTransmissionStatusFormGroup = FormGroup<CrbFileTransmissionStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbFileTransmissionStatusFormService {
  createCrbFileTransmissionStatusFormGroup(
    crbFileTransmissionStatus: CrbFileTransmissionStatusFormGroupInput = { id: null }
  ): CrbFileTransmissionStatusFormGroup {
    const crbFileTransmissionStatusRawValue = {
      ...this.getFormDefaults(),
      ...crbFileTransmissionStatus,
    };
    return new FormGroup<CrbFileTransmissionStatusFormGroupContent>({
      id: new FormControl(
        { value: crbFileTransmissionStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      submittedFileStatusTypeCode: new FormControl(crbFileTransmissionStatusRawValue.submittedFileStatusTypeCode, {
        validators: [Validators.required],
      }),
      submittedFileStatusType: new FormControl(crbFileTransmissionStatusRawValue.submittedFileStatusType, {
        validators: [Validators.required],
      }),
      submittedFileStatusTypeDescription: new FormControl(crbFileTransmissionStatusRawValue.submittedFileStatusTypeDescription),
    });
  }

  getCrbFileTransmissionStatus(form: CrbFileTransmissionStatusFormGroup): ICrbFileTransmissionStatus | NewCrbFileTransmissionStatus {
    return form.getRawValue() as ICrbFileTransmissionStatus | NewCrbFileTransmissionStatus;
  }

  resetForm(form: CrbFileTransmissionStatusFormGroup, crbFileTransmissionStatus: CrbFileTransmissionStatusFormGroupInput): void {
    const crbFileTransmissionStatusRawValue = { ...this.getFormDefaults(), ...crbFileTransmissionStatus };
    form.reset(
      {
        ...crbFileTransmissionStatusRawValue,
        id: { value: crbFileTransmissionStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbFileTransmissionStatusFormDefaults {
    return {
      id: null,
    };
  }
}
