import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbCreditApplicationStatus, NewCrbCreditApplicationStatus } from '../crb-credit-application-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbCreditApplicationStatus for edit and NewCrbCreditApplicationStatusFormGroupInput for create.
 */
type CrbCreditApplicationStatusFormGroupInput = ICrbCreditApplicationStatus | PartialWithRequiredKeyOf<NewCrbCreditApplicationStatus>;

type CrbCreditApplicationStatusFormDefaults = Pick<NewCrbCreditApplicationStatus, 'id'>;

type CrbCreditApplicationStatusFormGroupContent = {
  id: FormControl<ICrbCreditApplicationStatus['id'] | NewCrbCreditApplicationStatus['id']>;
  crbCreditApplicationStatusTypeCode: FormControl<ICrbCreditApplicationStatus['crbCreditApplicationStatusTypeCode']>;
  crbCreditApplicationStatusType: FormControl<ICrbCreditApplicationStatus['crbCreditApplicationStatusType']>;
  crbCreditApplicationStatusDetails: FormControl<ICrbCreditApplicationStatus['crbCreditApplicationStatusDetails']>;
};

export type CrbCreditApplicationStatusFormGroup = FormGroup<CrbCreditApplicationStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbCreditApplicationStatusFormService {
  createCrbCreditApplicationStatusFormGroup(
    crbCreditApplicationStatus: CrbCreditApplicationStatusFormGroupInput = { id: null }
  ): CrbCreditApplicationStatusFormGroup {
    const crbCreditApplicationStatusRawValue = {
      ...this.getFormDefaults(),
      ...crbCreditApplicationStatus,
    };
    return new FormGroup<CrbCreditApplicationStatusFormGroupContent>({
      id: new FormControl(
        { value: crbCreditApplicationStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      crbCreditApplicationStatusTypeCode: new FormControl(crbCreditApplicationStatusRawValue.crbCreditApplicationStatusTypeCode, {
        validators: [Validators.required],
      }),
      crbCreditApplicationStatusType: new FormControl(crbCreditApplicationStatusRawValue.crbCreditApplicationStatusType, {
        validators: [Validators.required],
      }),
      crbCreditApplicationStatusDetails: new FormControl(crbCreditApplicationStatusRawValue.crbCreditApplicationStatusDetails),
    });
  }

  getCrbCreditApplicationStatus(form: CrbCreditApplicationStatusFormGroup): ICrbCreditApplicationStatus | NewCrbCreditApplicationStatus {
    return form.getRawValue() as ICrbCreditApplicationStatus | NewCrbCreditApplicationStatus;
  }

  resetForm(form: CrbCreditApplicationStatusFormGroup, crbCreditApplicationStatus: CrbCreditApplicationStatusFormGroupInput): void {
    const crbCreditApplicationStatusRawValue = { ...this.getFormDefaults(), ...crbCreditApplicationStatus };
    form.reset(
      {
        ...crbCreditApplicationStatusRawValue,
        id: { value: crbCreditApplicationStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbCreditApplicationStatusFormDefaults {
    return {
      id: null,
    };
  }
}
