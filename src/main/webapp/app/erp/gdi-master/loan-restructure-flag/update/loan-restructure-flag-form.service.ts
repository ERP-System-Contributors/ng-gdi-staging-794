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

import { ILoanRestructureFlag, NewLoanRestructureFlag } from '../loan-restructure-flag.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanRestructureFlag for edit and NewLoanRestructureFlagFormGroupInput for create.
 */
type LoanRestructureFlagFormGroupInput = ILoanRestructureFlag | PartialWithRequiredKeyOf<NewLoanRestructureFlag>;

type LoanRestructureFlagFormDefaults = Pick<NewLoanRestructureFlag, 'id'>;

type LoanRestructureFlagFormGroupContent = {
  id: FormControl<ILoanRestructureFlag['id'] | NewLoanRestructureFlag['id']>;
  loanRestructureFlagCode: FormControl<ILoanRestructureFlag['loanRestructureFlagCode']>;
  loanRestructureFlagType: FormControl<ILoanRestructureFlag['loanRestructureFlagType']>;
  loanRestructureFlagDetails: FormControl<ILoanRestructureFlag['loanRestructureFlagDetails']>;
};

export type LoanRestructureFlagFormGroup = FormGroup<LoanRestructureFlagFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanRestructureFlagFormService {
  createLoanRestructureFlagFormGroup(loanRestructureFlag: LoanRestructureFlagFormGroupInput = { id: null }): LoanRestructureFlagFormGroup {
    const loanRestructureFlagRawValue = {
      ...this.getFormDefaults(),
      ...loanRestructureFlag,
    };
    return new FormGroup<LoanRestructureFlagFormGroupContent>({
      id: new FormControl(
        { value: loanRestructureFlagRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanRestructureFlagCode: new FormControl(loanRestructureFlagRawValue.loanRestructureFlagCode, {
        validators: [Validators.required],
      }),
      loanRestructureFlagType: new FormControl(loanRestructureFlagRawValue.loanRestructureFlagType, {
        validators: [Validators.required],
      }),
      loanRestructureFlagDetails: new FormControl(loanRestructureFlagRawValue.loanRestructureFlagDetails),
    });
  }

  getLoanRestructureFlag(form: LoanRestructureFlagFormGroup): ILoanRestructureFlag | NewLoanRestructureFlag {
    return form.getRawValue() as ILoanRestructureFlag | NewLoanRestructureFlag;
  }

  resetForm(form: LoanRestructureFlagFormGroup, loanRestructureFlag: LoanRestructureFlagFormGroupInput): void {
    const loanRestructureFlagRawValue = { ...this.getFormDefaults(), ...loanRestructureFlag };
    form.reset(
      {
        ...loanRestructureFlagRawValue,
        id: { value: loanRestructureFlagRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanRestructureFlagFormDefaults {
    return {
      id: null,
    };
  }
}
