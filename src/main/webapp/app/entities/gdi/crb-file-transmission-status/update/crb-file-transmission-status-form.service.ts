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
