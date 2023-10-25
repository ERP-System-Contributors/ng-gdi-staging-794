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

import { IFinancialDerivativeTypeCode, NewFinancialDerivativeTypeCode } from '../financial-derivative-type-code.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IFinancialDerivativeTypeCode for edit and NewFinancialDerivativeTypeCodeFormGroupInput for create.
 */
type FinancialDerivativeTypeCodeFormGroupInput = IFinancialDerivativeTypeCode | PartialWithRequiredKeyOf<NewFinancialDerivativeTypeCode>;

type FinancialDerivativeTypeCodeFormDefaults = Pick<NewFinancialDerivativeTypeCode, 'id'>;

type FinancialDerivativeTypeCodeFormGroupContent = {
  id: FormControl<IFinancialDerivativeTypeCode['id'] | NewFinancialDerivativeTypeCode['id']>;
  financialDerivativeTypeCode: FormControl<IFinancialDerivativeTypeCode['financialDerivativeTypeCode']>;
  financialDerivativeType: FormControl<IFinancialDerivativeTypeCode['financialDerivativeType']>;
  financialDerivativeTypeDetails: FormControl<IFinancialDerivativeTypeCode['financialDerivativeTypeDetails']>;
};

export type FinancialDerivativeTypeCodeFormGroup = FormGroup<FinancialDerivativeTypeCodeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class FinancialDerivativeTypeCodeFormService {
  createFinancialDerivativeTypeCodeFormGroup(
    financialDerivativeTypeCode: FinancialDerivativeTypeCodeFormGroupInput = { id: null }
  ): FinancialDerivativeTypeCodeFormGroup {
    const financialDerivativeTypeCodeRawValue = {
      ...this.getFormDefaults(),
      ...financialDerivativeTypeCode,
    };
    return new FormGroup<FinancialDerivativeTypeCodeFormGroupContent>({
      id: new FormControl(
        { value: financialDerivativeTypeCodeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      financialDerivativeTypeCode: new FormControl(financialDerivativeTypeCodeRawValue.financialDerivativeTypeCode, {
        validators: [Validators.required],
      }),
      financialDerivativeType: new FormControl(financialDerivativeTypeCodeRawValue.financialDerivativeType, {
        validators: [Validators.required],
      }),
      financialDerivativeTypeDetails: new FormControl(financialDerivativeTypeCodeRawValue.financialDerivativeTypeDetails),
    });
  }

  getFinancialDerivativeTypeCode(
    form: FinancialDerivativeTypeCodeFormGroup
  ): IFinancialDerivativeTypeCode | NewFinancialDerivativeTypeCode {
    return form.getRawValue() as IFinancialDerivativeTypeCode | NewFinancialDerivativeTypeCode;
  }

  resetForm(form: FinancialDerivativeTypeCodeFormGroup, financialDerivativeTypeCode: FinancialDerivativeTypeCodeFormGroupInput): void {
    const financialDerivativeTypeCodeRawValue = { ...this.getFormDefaults(), ...financialDerivativeTypeCode };
    form.reset(
      {
        ...financialDerivativeTypeCodeRawValue,
        id: { value: financialDerivativeTypeCodeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): FinancialDerivativeTypeCodeFormDefaults {
    return {
      id: null,
    };
  }
}
