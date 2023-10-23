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
