import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IInterestCalcMethod, NewInterestCalcMethod } from '../interest-calc-method.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInterestCalcMethod for edit and NewInterestCalcMethodFormGroupInput for create.
 */
type InterestCalcMethodFormGroupInput = IInterestCalcMethod | PartialWithRequiredKeyOf<NewInterestCalcMethod>;

type InterestCalcMethodFormDefaults = Pick<NewInterestCalcMethod, 'id'>;

type InterestCalcMethodFormGroupContent = {
  id: FormControl<IInterestCalcMethod['id'] | NewInterestCalcMethod['id']>;
  interestCalculationMethodCode: FormControl<IInterestCalcMethod['interestCalculationMethodCode']>;
  interestCalculationMthodType: FormControl<IInterestCalcMethod['interestCalculationMthodType']>;
  interestCalculationMethodDetails: FormControl<IInterestCalcMethod['interestCalculationMethodDetails']>;
};

export type InterestCalcMethodFormGroup = FormGroup<InterestCalcMethodFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InterestCalcMethodFormService {
  createInterestCalcMethodFormGroup(interestCalcMethod: InterestCalcMethodFormGroupInput = { id: null }): InterestCalcMethodFormGroup {
    const interestCalcMethodRawValue = {
      ...this.getFormDefaults(),
      ...interestCalcMethod,
    };
    return new FormGroup<InterestCalcMethodFormGroupContent>({
      id: new FormControl(
        { value: interestCalcMethodRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      interestCalculationMethodCode: new FormControl(interestCalcMethodRawValue.interestCalculationMethodCode, {
        validators: [Validators.required],
      }),
      interestCalculationMthodType: new FormControl(interestCalcMethodRawValue.interestCalculationMthodType, {
        validators: [Validators.required],
      }),
      interestCalculationMethodDetails: new FormControl(interestCalcMethodRawValue.interestCalculationMethodDetails),
    });
  }

  getInterestCalcMethod(form: InterestCalcMethodFormGroup): IInterestCalcMethod | NewInterestCalcMethod {
    return form.getRawValue() as IInterestCalcMethod | NewInterestCalcMethod;
  }

  resetForm(form: InterestCalcMethodFormGroup, interestCalcMethod: InterestCalcMethodFormGroupInput): void {
    const interestCalcMethodRawValue = { ...this.getFormDefaults(), ...interestCalcMethod };
    form.reset(
      {
        ...interestCalcMethodRawValue,
        id: { value: interestCalcMethodRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): InterestCalcMethodFormDefaults {
    return {
      id: null,
    };
  }
}
