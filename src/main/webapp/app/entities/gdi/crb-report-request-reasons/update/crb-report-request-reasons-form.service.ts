import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICrbReportRequestReasons, NewCrbReportRequestReasons } from '../crb-report-request-reasons.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICrbReportRequestReasons for edit and NewCrbReportRequestReasonsFormGroupInput for create.
 */
type CrbReportRequestReasonsFormGroupInput = ICrbReportRequestReasons | PartialWithRequiredKeyOf<NewCrbReportRequestReasons>;

type CrbReportRequestReasonsFormDefaults = Pick<NewCrbReportRequestReasons, 'id'>;

type CrbReportRequestReasonsFormGroupContent = {
  id: FormControl<ICrbReportRequestReasons['id'] | NewCrbReportRequestReasons['id']>;
  creditReportRequestReasonTypeCode: FormControl<ICrbReportRequestReasons['creditReportRequestReasonTypeCode']>;
  creditReportRequestReasonType: FormControl<ICrbReportRequestReasons['creditReportRequestReasonType']>;
  creditReportRequestDetails: FormControl<ICrbReportRequestReasons['creditReportRequestDetails']>;
};

export type CrbReportRequestReasonsFormGroup = FormGroup<CrbReportRequestReasonsFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CrbReportRequestReasonsFormService {
  createCrbReportRequestReasonsFormGroup(
    crbReportRequestReasons: CrbReportRequestReasonsFormGroupInput = { id: null }
  ): CrbReportRequestReasonsFormGroup {
    const crbReportRequestReasonsRawValue = {
      ...this.getFormDefaults(),
      ...crbReportRequestReasons,
    };
    return new FormGroup<CrbReportRequestReasonsFormGroupContent>({
      id: new FormControl(
        { value: crbReportRequestReasonsRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      creditReportRequestReasonTypeCode: new FormControl(crbReportRequestReasonsRawValue.creditReportRequestReasonTypeCode, {
        validators: [Validators.required],
      }),
      creditReportRequestReasonType: new FormControl(crbReportRequestReasonsRawValue.creditReportRequestReasonType, {
        validators: [Validators.required],
      }),
      creditReportRequestDetails: new FormControl(crbReportRequestReasonsRawValue.creditReportRequestDetails),
    });
  }

  getCrbReportRequestReasons(form: CrbReportRequestReasonsFormGroup): ICrbReportRequestReasons | NewCrbReportRequestReasons {
    return form.getRawValue() as ICrbReportRequestReasons | NewCrbReportRequestReasons;
  }

  resetForm(form: CrbReportRequestReasonsFormGroup, crbReportRequestReasons: CrbReportRequestReasonsFormGroupInput): void {
    const crbReportRequestReasonsRawValue = { ...this.getFormDefaults(), ...crbReportRequestReasons };
    form.reset(
      {
        ...crbReportRequestReasonsRawValue,
        id: { value: crbReportRequestReasonsRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CrbReportRequestReasonsFormDefaults {
    return {
      id: null,
    };
  }
}
