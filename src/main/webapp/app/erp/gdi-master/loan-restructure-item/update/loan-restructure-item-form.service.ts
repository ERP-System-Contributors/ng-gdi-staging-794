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

import { ILoanRestructureItem, NewLoanRestructureItem } from '../loan-restructure-item.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanRestructureItem for edit and NewLoanRestructureItemFormGroupInput for create.
 */
type LoanRestructureItemFormGroupInput = ILoanRestructureItem | PartialWithRequiredKeyOf<NewLoanRestructureItem>;

type LoanRestructureItemFormDefaults = Pick<NewLoanRestructureItem, 'id'>;

type LoanRestructureItemFormGroupContent = {
  id: FormControl<ILoanRestructureItem['id'] | NewLoanRestructureItem['id']>;
  loanRestructureItemCode: FormControl<ILoanRestructureItem['loanRestructureItemCode']>;
  loanRestructureItemType: FormControl<ILoanRestructureItem['loanRestructureItemType']>;
  loanRestructureItemDetails: FormControl<ILoanRestructureItem['loanRestructureItemDetails']>;
};

export type LoanRestructureItemFormGroup = FormGroup<LoanRestructureItemFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanRestructureItemFormService {
  createLoanRestructureItemFormGroup(loanRestructureItem: LoanRestructureItemFormGroupInput = { id: null }): LoanRestructureItemFormGroup {
    const loanRestructureItemRawValue = {
      ...this.getFormDefaults(),
      ...loanRestructureItem,
    };
    return new FormGroup<LoanRestructureItemFormGroupContent>({
      id: new FormControl(
        { value: loanRestructureItemRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      loanRestructureItemCode: new FormControl(loanRestructureItemRawValue.loanRestructureItemCode, {
        validators: [Validators.required],
      }),
      loanRestructureItemType: new FormControl(loanRestructureItemRawValue.loanRestructureItemType, {
        validators: [Validators.required],
      }),
      loanRestructureItemDetails: new FormControl(loanRestructureItemRawValue.loanRestructureItemDetails),
    });
  }

  getLoanRestructureItem(form: LoanRestructureItemFormGroup): ILoanRestructureItem | NewLoanRestructureItem {
    return form.getRawValue() as ILoanRestructureItem | NewLoanRestructureItem;
  }

  resetForm(form: LoanRestructureItemFormGroup, loanRestructureItem: LoanRestructureItemFormGroupInput): void {
    const loanRestructureItemRawValue = { ...this.getFormDefaults(), ...loanRestructureItem };
    form.reset(
      {
        ...loanRestructureItemRawValue,
        id: { value: loanRestructureItemRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanRestructureItemFormDefaults {
    return {
      id: null,
    };
  }
}
