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
