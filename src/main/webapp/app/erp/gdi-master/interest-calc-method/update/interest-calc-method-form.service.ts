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
