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
