import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ILoanPerformanceClassification, NewLoanPerformanceClassification } from '../loan-performance-classification.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanPerformanceClassification for edit and NewLoanPerformanceClassificationFormGroupInput for create.
 */
type LoanPerformanceClassificationFormGroupInput =
  | ILoanPerformanceClassification
  | PartialWithRequiredKeyOf<NewLoanPerformanceClassification>;

type LoanPerformanceClassificationFormDefaults = Pick<NewLoanPerformanceClassification, 'id'>;

type LoanPerformanceClassificationFormGroupContent = {
  id: FormControl<ILoanPerformanceClassification['id'] | NewLoanPerformanceClassification['id']>;
  loanPerformanceClassificationCode: FormControl<ILoanPerformanceClassification['loanPerformanceClassificationCode']>;
  loanPerformanceClassificationType: FormControl<ILoanPerformanceClassification['loanPerformanceClassificationType']>;
  commercialBankDescription: FormControl<ILoanPerformanceClassification['commercialBankDescription']>;
  microfinanceDescription: FormControl<ILoanPerformanceClassification['microfinanceDescription']>;
};

export type LoanPerformanceClassificationFormGroup = FormGroup<LoanPerformanceClassificationFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanPerformanceClassificationFormService {
  createLoanPerformanceClassificationFormGroup(
    loanPerformanceClassification: LoanPerformanceClassificationFormGroupInput = { id: null }
  ): LoanPerformanceClassificationFormGroup {
    const loanPerformanceClassificationRawValue = {
      ...this.getFormDefaults(),
      ...loanPerformanceClassification,
    };
    return new FormGroup<LoanPerformanceClassificationFormGroupContent>({
      id: new FormControl(
        { value: loanPerformanceClassificationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanPerformanceClassificationCode: new FormControl(loanPerformanceClassificationRawValue.loanPerformanceClassificationCode, {
        validators: [Validators.required],
      }),
      loanPerformanceClassificationType: new FormControl(loanPerformanceClassificationRawValue.loanPerformanceClassificationType, {
        validators: [Validators.required],
      }),
      commercialBankDescription: new FormControl(loanPerformanceClassificationRawValue.commercialBankDescription),
      microfinanceDescription: new FormControl(loanPerformanceClassificationRawValue.microfinanceDescription),
    });
  }

  getLoanPerformanceClassification(
    form: LoanPerformanceClassificationFormGroup
  ): ILoanPerformanceClassification | NewLoanPerformanceClassification {
    return form.getRawValue() as ILoanPerformanceClassification | NewLoanPerformanceClassification;
  }

  resetForm(
    form: LoanPerformanceClassificationFormGroup,
    loanPerformanceClassification: LoanPerformanceClassificationFormGroupInput
  ): void {
    const loanPerformanceClassificationRawValue = { ...this.getFormDefaults(), ...loanPerformanceClassification };
    form.reset(
      {
        ...loanPerformanceClassificationRawValue,
        id: { value: loanPerformanceClassificationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanPerformanceClassificationFormDefaults {
    return {
      id: null,
    };
  }
}
