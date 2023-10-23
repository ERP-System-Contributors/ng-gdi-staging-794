import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILoanDeclineReason, NewLoanDeclineReason } from '../loan-decline-reason.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanDeclineReason for edit and NewLoanDeclineReasonFormGroupInput for create.
 */
type LoanDeclineReasonFormGroupInput = ILoanDeclineReason | PartialWithRequiredKeyOf<NewLoanDeclineReason>;

type LoanDeclineReasonFormDefaults = Pick<NewLoanDeclineReason, 'id'>;

type LoanDeclineReasonFormGroupContent = {
  id: FormControl<ILoanDeclineReason['id'] | NewLoanDeclineReason['id']>;
  loanDeclineReasonTypeCode: FormControl<ILoanDeclineReason['loanDeclineReasonTypeCode']>;
  loanDeclineReasonType: FormControl<ILoanDeclineReason['loanDeclineReasonType']>;
  loanDeclineReasonDetails: FormControl<ILoanDeclineReason['loanDeclineReasonDetails']>;
};

export type LoanDeclineReasonFormGroup = FormGroup<LoanDeclineReasonFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanDeclineReasonFormService {
  createLoanDeclineReasonFormGroup(loanDeclineReason: LoanDeclineReasonFormGroupInput = { id: null }): LoanDeclineReasonFormGroup {
    const loanDeclineReasonRawValue = {
      ...this.getFormDefaults(),
      ...loanDeclineReason,
    };
    return new FormGroup<LoanDeclineReasonFormGroupContent>({
      id: new FormControl(
        { value: loanDeclineReasonRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanDeclineReasonTypeCode: new FormControl(loanDeclineReasonRawValue.loanDeclineReasonTypeCode, {
        validators: [Validators.required],
      }),
      loanDeclineReasonType: new FormControl(loanDeclineReasonRawValue.loanDeclineReasonType, {
        validators: [Validators.required],
      }),
      loanDeclineReasonDetails: new FormControl(loanDeclineReasonRawValue.loanDeclineReasonDetails),
    });
  }

  getLoanDeclineReason(form: LoanDeclineReasonFormGroup): ILoanDeclineReason | NewLoanDeclineReason {
    return form.getRawValue() as ILoanDeclineReason | NewLoanDeclineReason;
  }

  resetForm(form: LoanDeclineReasonFormGroup, loanDeclineReason: LoanDeclineReasonFormGroupInput): void {
    const loanDeclineReasonRawValue = { ...this.getFormDefaults(), ...loanDeclineReason };
    form.reset(
      {
        ...loanDeclineReasonRawValue,
        id: { value: loanDeclineReasonRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanDeclineReasonFormDefaults {
    return {
      id: null,
    };
  }
}
