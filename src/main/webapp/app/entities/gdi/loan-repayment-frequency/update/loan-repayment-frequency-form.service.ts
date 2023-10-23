import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILoanRepaymentFrequency, NewLoanRepaymentFrequency } from '../loan-repayment-frequency.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanRepaymentFrequency for edit and NewLoanRepaymentFrequencyFormGroupInput for create.
 */
type LoanRepaymentFrequencyFormGroupInput = ILoanRepaymentFrequency | PartialWithRequiredKeyOf<NewLoanRepaymentFrequency>;

type LoanRepaymentFrequencyFormDefaults = Pick<NewLoanRepaymentFrequency, 'id'>;

type LoanRepaymentFrequencyFormGroupContent = {
  id: FormControl<ILoanRepaymentFrequency['id'] | NewLoanRepaymentFrequency['id']>;
  frequencyTypeCode: FormControl<ILoanRepaymentFrequency['frequencyTypeCode']>;
  frequencyType: FormControl<ILoanRepaymentFrequency['frequencyType']>;
  frequencyTypeDetails: FormControl<ILoanRepaymentFrequency['frequencyTypeDetails']>;
};

export type LoanRepaymentFrequencyFormGroup = FormGroup<LoanRepaymentFrequencyFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanRepaymentFrequencyFormService {
  createLoanRepaymentFrequencyFormGroup(
    loanRepaymentFrequency: LoanRepaymentFrequencyFormGroupInput = { id: null }
  ): LoanRepaymentFrequencyFormGroup {
    const loanRepaymentFrequencyRawValue = {
      ...this.getFormDefaults(),
      ...loanRepaymentFrequency,
    };
    return new FormGroup<LoanRepaymentFrequencyFormGroupContent>({
      id: new FormControl(
        { value: loanRepaymentFrequencyRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      frequencyTypeCode: new FormControl(loanRepaymentFrequencyRawValue.frequencyTypeCode, {
        validators: [Validators.required],
      }),
      frequencyType: new FormControl(loanRepaymentFrequencyRawValue.frequencyType, {
        validators: [Validators.required],
      }),
      frequencyTypeDetails: new FormControl(loanRepaymentFrequencyRawValue.frequencyTypeDetails),
    });
  }

  getLoanRepaymentFrequency(form: LoanRepaymentFrequencyFormGroup): ILoanRepaymentFrequency | NewLoanRepaymentFrequency {
    return form.getRawValue() as ILoanRepaymentFrequency | NewLoanRepaymentFrequency;
  }

  resetForm(form: LoanRepaymentFrequencyFormGroup, loanRepaymentFrequency: LoanRepaymentFrequencyFormGroupInput): void {
    const loanRepaymentFrequencyRawValue = { ...this.getFormDefaults(), ...loanRepaymentFrequency };
    form.reset(
      {
        ...loanRepaymentFrequencyRawValue,
        id: { value: loanRepaymentFrequencyRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanRepaymentFrequencyFormDefaults {
    return {
      id: null,
    };
  }
}
