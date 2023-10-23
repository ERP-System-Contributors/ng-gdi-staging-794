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
