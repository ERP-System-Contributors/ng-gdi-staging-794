import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILoanApplicationStatus, NewLoanApplicationStatus } from '../loan-application-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanApplicationStatus for edit and NewLoanApplicationStatusFormGroupInput for create.
 */
type LoanApplicationStatusFormGroupInput = ILoanApplicationStatus | PartialWithRequiredKeyOf<NewLoanApplicationStatus>;

type LoanApplicationStatusFormDefaults = Pick<NewLoanApplicationStatus, 'id'>;

type LoanApplicationStatusFormGroupContent = {
  id: FormControl<ILoanApplicationStatus['id'] | NewLoanApplicationStatus['id']>;
  loanApplicationStatusTypeCode: FormControl<ILoanApplicationStatus['loanApplicationStatusTypeCode']>;
  loanApplicationStatusType: FormControl<ILoanApplicationStatus['loanApplicationStatusType']>;
  loanApplicationStatusDetails: FormControl<ILoanApplicationStatus['loanApplicationStatusDetails']>;
};

export type LoanApplicationStatusFormGroup = FormGroup<LoanApplicationStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanApplicationStatusFormService {
  createLoanApplicationStatusFormGroup(
    loanApplicationStatus: LoanApplicationStatusFormGroupInput = { id: null }
  ): LoanApplicationStatusFormGroup {
    const loanApplicationStatusRawValue = {
      ...this.getFormDefaults(),
      ...loanApplicationStatus,
    };
    return new FormGroup<LoanApplicationStatusFormGroupContent>({
      id: new FormControl(
        { value: loanApplicationStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanApplicationStatusTypeCode: new FormControl(loanApplicationStatusRawValue.loanApplicationStatusTypeCode, {
        validators: [Validators.required],
      }),
      loanApplicationStatusType: new FormControl(loanApplicationStatusRawValue.loanApplicationStatusType, {
        validators: [Validators.required],
      }),
      loanApplicationStatusDetails: new FormControl(loanApplicationStatusRawValue.loanApplicationStatusDetails),
    });
  }

  getLoanApplicationStatus(form: LoanApplicationStatusFormGroup): ILoanApplicationStatus | NewLoanApplicationStatus {
    return form.getRawValue() as ILoanApplicationStatus | NewLoanApplicationStatus;
  }

  resetForm(form: LoanApplicationStatusFormGroup, loanApplicationStatus: LoanApplicationStatusFormGroupInput): void {
    const loanApplicationStatusRawValue = { ...this.getFormDefaults(), ...loanApplicationStatus };
    form.reset(
      {
        ...loanApplicationStatusRawValue,
        id: { value: loanApplicationStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanApplicationStatusFormDefaults {
    return {
      id: null,
    };
  }
}
