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

import { ICreditCardOwnership, NewCreditCardOwnership } from '../credit-card-ownership.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICreditCardOwnership for edit and NewCreditCardOwnershipFormGroupInput for create.
 */
type CreditCardOwnershipFormGroupInput = ICreditCardOwnership | PartialWithRequiredKeyOf<NewCreditCardOwnership>;

type CreditCardOwnershipFormDefaults = Pick<NewCreditCardOwnership, 'id'>;

type CreditCardOwnershipFormGroupContent = {
  id: FormControl<ICreditCardOwnership['id'] | NewCreditCardOwnership['id']>;
  creditCardOwnershipCategoryCode: FormControl<ICreditCardOwnership['creditCardOwnershipCategoryCode']>;
  creditCardOwnershipCategoryType: FormControl<ICreditCardOwnership['creditCardOwnershipCategoryType']>;
  description: FormControl<ICreditCardOwnership['description']>;
};

export type CreditCardOwnershipFormGroup = FormGroup<CreditCardOwnershipFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CreditCardOwnershipFormService {
  createCreditCardOwnershipFormGroup(creditCardOwnership: CreditCardOwnershipFormGroupInput = { id: null }): CreditCardOwnershipFormGroup {
    const creditCardOwnershipRawValue = {
      ...this.getFormDefaults(),
      ...creditCardOwnership,
    };
    return new FormGroup<CreditCardOwnershipFormGroupContent>({
      id: new FormControl(
        { value: creditCardOwnershipRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      creditCardOwnershipCategoryCode: new FormControl(creditCardOwnershipRawValue.creditCardOwnershipCategoryCode, {
        validators: [Validators.required],
      }),
      creditCardOwnershipCategoryType: new FormControl(creditCardOwnershipRawValue.creditCardOwnershipCategoryType, {
        validators: [Validators.required],
      }),
      description: new FormControl(creditCardOwnershipRawValue.description),
    });
  }

  getCreditCardOwnership(form: CreditCardOwnershipFormGroup): ICreditCardOwnership | NewCreditCardOwnership {
    return form.getRawValue() as ICreditCardOwnership | NewCreditCardOwnership;
  }

  resetForm(form: CreditCardOwnershipFormGroup, creditCardOwnership: CreditCardOwnershipFormGroupInput): void {
    const creditCardOwnershipRawValue = { ...this.getFormDefaults(), ...creditCardOwnership };
    form.reset(
      {
        ...creditCardOwnershipRawValue,
        id: { value: creditCardOwnershipRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CreditCardOwnershipFormDefaults {
    return {
      id: null,
    };
  }
}
