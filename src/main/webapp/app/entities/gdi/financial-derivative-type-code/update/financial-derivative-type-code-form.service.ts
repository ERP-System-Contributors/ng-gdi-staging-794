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
