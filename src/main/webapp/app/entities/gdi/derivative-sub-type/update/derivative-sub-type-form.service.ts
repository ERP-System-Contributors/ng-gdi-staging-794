import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IDerivativeSubType, NewDerivativeSubType } from '../derivative-sub-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IDerivativeSubType for edit and NewDerivativeSubTypeFormGroupInput for create.
 */
type DerivativeSubTypeFormGroupInput = IDerivativeSubType | PartialWithRequiredKeyOf<NewDerivativeSubType>;

type DerivativeSubTypeFormDefaults = Pick<NewDerivativeSubType, 'id'>;

type DerivativeSubTypeFormGroupContent = {
  id: FormControl<IDerivativeSubType['id'] | NewDerivativeSubType['id']>;
  financialDerivativeSubTypeCode: FormControl<IDerivativeSubType['financialDerivativeSubTypeCode']>;
  financialDerivativeSubTye: FormControl<IDerivativeSubType['financialDerivativeSubTye']>;
  financialDerivativeSubtypeDetails: FormControl<IDerivativeSubType['financialDerivativeSubtypeDetails']>;
};

export type DerivativeSubTypeFormGroup = FormGroup<DerivativeSubTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class DerivativeSubTypeFormService {
  createDerivativeSubTypeFormGroup(derivativeSubType: DerivativeSubTypeFormGroupInput = { id: null }): DerivativeSubTypeFormGroup {
    const derivativeSubTypeRawValue = {
      ...this.getFormDefaults(),
      ...derivativeSubType,
    };
    return new FormGroup<DerivativeSubTypeFormGroupContent>({
      id: new FormControl(
        { value: derivativeSubTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      financialDerivativeSubTypeCode: new FormControl(derivativeSubTypeRawValue.financialDerivativeSubTypeCode, {
        validators: [Validators.required],
      }),
      financialDerivativeSubTye: new FormControl(derivativeSubTypeRawValue.financialDerivativeSubTye, {
        validators: [Validators.required],
      }),
      financialDerivativeSubtypeDetails: new FormControl(derivativeSubTypeRawValue.financialDerivativeSubtypeDetails),
    });
  }

  getDerivativeSubType(form: DerivativeSubTypeFormGroup): IDerivativeSubType | NewDerivativeSubType {
    return form.getRawValue() as IDerivativeSubType | NewDerivativeSubType;
  }

  resetForm(form: DerivativeSubTypeFormGroup, derivativeSubType: DerivativeSubTypeFormGroupInput): void {
    const derivativeSubTypeRawValue = { ...this.getFormDefaults(), ...derivativeSubType };
    form.reset(
      {
        ...derivativeSubTypeRawValue,
        id: { value: derivativeSubTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): DerivativeSubTypeFormDefaults {
    return {
      id: null,
    };
  }
}
