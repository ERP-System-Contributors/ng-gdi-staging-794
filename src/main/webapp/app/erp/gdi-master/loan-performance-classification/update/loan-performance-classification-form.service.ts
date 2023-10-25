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
