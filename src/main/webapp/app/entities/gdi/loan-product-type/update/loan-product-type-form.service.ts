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

import { ILoanProductType, NewLoanProductType } from '../loan-product-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILoanProductType for edit and NewLoanProductTypeFormGroupInput for create.
 */
type LoanProductTypeFormGroupInput = ILoanProductType | PartialWithRequiredKeyOf<NewLoanProductType>;

type LoanProductTypeFormDefaults = Pick<NewLoanProductType, 'id'>;

type LoanProductTypeFormGroupContent = {
  id: FormControl<ILoanProductType['id'] | NewLoanProductType['id']>;
  productCode: FormControl<ILoanProductType['productCode']>;
  productType: FormControl<ILoanProductType['productType']>;
  productTypeDescription: FormControl<ILoanProductType['productTypeDescription']>;
};

export type LoanProductTypeFormGroup = FormGroup<LoanProductTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LoanProductTypeFormService {
  createLoanProductTypeFormGroup(loanProductType: LoanProductTypeFormGroupInput = { id: null }): LoanProductTypeFormGroup {
    const loanProductTypeRawValue = {
      ...this.getFormDefaults(),
      ...loanProductType,
    };
    return new FormGroup<LoanProductTypeFormGroupContent>({
      id: new FormControl(
        { value: loanProductTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      productCode: new FormControl(loanProductTypeRawValue.productCode, {
        validators: [Validators.required],
      }),
      productType: new FormControl(loanProductTypeRawValue.productType, {
        validators: [Validators.required],
      }),
      productTypeDescription: new FormControl(loanProductTypeRawValue.productTypeDescription),
    });
  }

  getLoanProductType(form: LoanProductTypeFormGroup): ILoanProductType | NewLoanProductType {
    return form.getRawValue() as ILoanProductType | NewLoanProductType;
  }

  resetForm(form: LoanProductTypeFormGroup, loanProductType: LoanProductTypeFormGroupInput): void {
    const loanProductTypeRawValue = { ...this.getFormDefaults(), ...loanProductType };
    form.reset(
      {
        ...loanProductTypeRawValue,
        id: { value: loanProductTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LoanProductTypeFormDefaults {
    return {
      id: null,
    };
  }
}
