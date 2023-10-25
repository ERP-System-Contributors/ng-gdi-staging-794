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

import { ILoanApplicationType, NewLoanApplicationType } from '../loan-application-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanApplicationType for edit and NewLoanApplicationTypeFormGroupInput for create.
 */
type LoanApplicationTypeFormGroupInput = ILoanApplicationType | PartialWithRequiredKeyOf<NewLoanApplicationType>;

type LoanApplicationTypeFormDefaults = Pick<NewLoanApplicationType, 'id'>;

type LoanApplicationTypeFormGroupContent = {
  id: FormControl<ILoanApplicationType['id'] | NewLoanApplicationType['id']>;
  loanApplicationTypeCode: FormControl<ILoanApplicationType['loanApplicationTypeCode']>;
  loanApplicationType: FormControl<ILoanApplicationType['loanApplicationType']>;
  loanApplicationDetails: FormControl<ILoanApplicationType['loanApplicationDetails']>;
};

export type LoanApplicationTypeFormGroup = FormGroup<LoanApplicationTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanApplicationTypeFormService {
  createLoanApplicationTypeFormGroup(loanApplicationType: LoanApplicationTypeFormGroupInput = { id: null }): LoanApplicationTypeFormGroup {
    const loanApplicationTypeRawValue = {
      ...this.getFormDefaults(),
      ...loanApplicationType,
    };
    return new FormGroup<LoanApplicationTypeFormGroupContent>({
      id: new FormControl(
        { value: loanApplicationTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanApplicationTypeCode: new FormControl(loanApplicationTypeRawValue.loanApplicationTypeCode, {
        validators: [Validators.required],
      }),
      loanApplicationType: new FormControl(loanApplicationTypeRawValue.loanApplicationType, {
        validators: [Validators.required],
      }),
      loanApplicationDetails: new FormControl(loanApplicationTypeRawValue.loanApplicationDetails),
    });
  }

  getLoanApplicationType(form: LoanApplicationTypeFormGroup): ILoanApplicationType | NewLoanApplicationType {
    return form.getRawValue() as ILoanApplicationType | NewLoanApplicationType;
  }

  resetForm(form: LoanApplicationTypeFormGroup, loanApplicationType: LoanApplicationTypeFormGroupInput): void {
    const loanApplicationTypeRawValue = { ...this.getFormDefaults(), ...loanApplicationType };
    form.reset(
      {
        ...loanApplicationTypeRawValue,
        id: { value: loanApplicationTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanApplicationTypeFormDefaults {
    return {
      id: null,
    };
  }
}
