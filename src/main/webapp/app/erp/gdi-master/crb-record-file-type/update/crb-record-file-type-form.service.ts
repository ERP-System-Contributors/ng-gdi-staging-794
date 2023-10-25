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

import { ICrbRecordFileType, NewCrbRecordFileType } from '../crb-record-file-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbRecordFileType for edit and NewCrbRecordFileTypeFormGroupInput for create.
 */
type CrbRecordFileTypeFormGroupInput = ICrbRecordFileType | PartialWithRequiredKeyOf<NewCrbRecordFileType>;

type CrbRecordFileTypeFormDefaults = Pick<NewCrbRecordFileType, 'id'>;

type CrbRecordFileTypeFormGroupContent = {
  id: FormControl<ICrbRecordFileType['id'] | NewCrbRecordFileType['id']>;
  recordFileTypeCode: FormControl<ICrbRecordFileType['recordFileTypeCode']>;
  recordFileType: FormControl<ICrbRecordFileType['recordFileType']>;
  recordFileTypeDetails: FormControl<ICrbRecordFileType['recordFileTypeDetails']>;
};

export type CrbRecordFileTypeFormGroup = FormGroup<CrbRecordFileTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbRecordFileTypeFormService {
  createCrbRecordFileTypeFormGroup(crbRecordFileType: CrbRecordFileTypeFormGroupInput = { id: null }): CrbRecordFileTypeFormGroup {
    const crbRecordFileTypeRawValue = {
      ...this.getFormDefaults(),
      ...crbRecordFileType,
    };
    return new FormGroup<CrbRecordFileTypeFormGroupContent>({
      id: new FormControl(
        { value: crbRecordFileTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      recordFileTypeCode: new FormControl(crbRecordFileTypeRawValue.recordFileTypeCode, {
        validators: [Validators.required],
      }),
      recordFileType: new FormControl(crbRecordFileTypeRawValue.recordFileType, {
        validators: [Validators.required],
      }),
      recordFileTypeDetails: new FormControl(crbRecordFileTypeRawValue.recordFileTypeDetails),
    });
  }

  getCrbRecordFileType(form: CrbRecordFileTypeFormGroup): ICrbRecordFileType | NewCrbRecordFileType {
    return form.getRawValue() as ICrbRecordFileType | NewCrbRecordFileType;
  }

  resetForm(form: CrbRecordFileTypeFormGroup, crbRecordFileType: CrbRecordFileTypeFormGroupInput): void {
    const crbRecordFileTypeRawValue = { ...this.getFormDefaults(), ...crbRecordFileType };
    form.reset(
      {
        ...crbRecordFileTypeRawValue,
        id: { value: crbRecordFileTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbRecordFileTypeFormDefaults {
    return {
      id: null,
    };
  }
}
