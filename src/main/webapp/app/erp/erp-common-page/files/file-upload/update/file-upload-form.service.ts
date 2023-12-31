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

import { IFileUpload, NewFileUpload } from '../file-upload.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFileUpload for edit and NewFileUploadFormGroupInput for create.
 */
type FileUploadFormGroupInput = IFileUpload | PartialWithRequiredKeyOf<NewFileUpload>;

type FileUploadFormDefaults = Pick<NewFileUpload, 'id' | 'uploadSuccessful' | 'uploadProcessed' | 'placeholders'>;

type FileUploadFormGroupContent = {
  id: FormControl<IFileUpload['id'] | NewFileUpload['id']>;
  description: FormControl<IFileUpload['description']>;
  fileName: FormControl<IFileUpload['fileName']>;
  periodFrom: FormControl<IFileUpload['periodFrom']>;
  periodTo: FormControl<IFileUpload['periodTo']>;
  fileTypeId: FormControl<IFileUpload['fileTypeId']>;
  dataFile: FormControl<IFileUpload['dataFile']>;
  dataFileContentType: FormControl<IFileUpload['dataFileContentType']>;
  uploadSuccessful: FormControl<IFileUpload['uploadSuccessful']>;
  uploadProcessed: FormControl<IFileUpload['uploadProcessed']>;
  uploadToken: FormControl<IFileUpload['uploadToken']>;
  placeholders: FormControl<IFileUpload['placeholders']>;
};

export type FileUploadFormGroup = FormGroup<FileUploadFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FileUploadFormService {
  createFileUploadFormGroup(fileUpload: FileUploadFormGroupInput = { id: null }): FileUploadFormGroup {
    const fileUploadRawValue = {
      ...this.getFormDefaults(),
      ...fileUpload,
    };
    return new FormGroup<FileUploadFormGroupContent>({
      id: new FormControl(
        { value: fileUploadRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      description: new FormControl(fileUploadRawValue.description, {
        validators: [Validators.required],
      }),
      fileName: new FormControl(fileUploadRawValue.fileName, {
        validators: [Validators.required],
      }),
      periodFrom: new FormControl(fileUploadRawValue.periodFrom),
      periodTo: new FormControl(fileUploadRawValue.periodTo),
      fileTypeId: new FormControl(fileUploadRawValue.fileTypeId, {
        validators: [Validators.required],
      }),
      dataFile: new FormControl(fileUploadRawValue.dataFile, {
        validators: [Validators.required],
      }),
      dataFileContentType: new FormControl(fileUploadRawValue.dataFileContentType),
      uploadSuccessful: new FormControl(fileUploadRawValue.uploadSuccessful),
      uploadProcessed: new FormControl(fileUploadRawValue.uploadProcessed),
      uploadToken: new FormControl(fileUploadRawValue.uploadToken),
      placeholders: new FormControl(fileUploadRawValue.placeholders ?? []),
    });
  }

  getFileUpload(form: FileUploadFormGroup): IFileUpload | NewFileUpload {
    return form.getRawValue() as IFileUpload | NewFileUpload;
  }

  resetForm(form: FileUploadFormGroup, fileUpload: FileUploadFormGroupInput): void {
    const fileUploadRawValue = { ...this.getFormDefaults(), ...fileUpload };
    form.reset(
      {
        ...fileUploadRawValue,
        id: { value: fileUploadRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FileUploadFormDefaults {
    return {
      id: null,
      uploadSuccessful: false,
      uploadProcessed: false,
      placeholders: [],
    };
  }
}
