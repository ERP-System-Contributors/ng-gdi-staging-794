import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IBankTransactionType, NewBankTransactionType } from '../bank-transaction-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IBankTransactionType for edit and NewBankTransactionTypeFormGroupInput for create.
 */
type BankTransactionTypeFormGroupInput = IBankTransactionType | PartialWithRequiredKeyOf<NewBankTransactionType>;

type BankTransactionTypeFormDefaults = Pick<NewBankTransactionType, 'id'>;

type BankTransactionTypeFormGroupContent = {
  id: FormControl<IBankTransactionType['id'] | NewBankTransactionType['id']>;
  transactionTypeCode: FormControl<IBankTransactionType['transactionTypeCode']>;
  transactionTypeDetails: FormControl<IBankTransactionType['transactionTypeDetails']>;
};

export type BankTransactionTypeFormGroup = FormGroup<BankTransactionTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class BankTransactionTypeFormService {
  createBankTransactionTypeFormGroup(bankTransactionType: BankTransactionTypeFormGroupInput = { id: null }): BankTransactionTypeFormGroup {
    const bankTransactionTypeRawValue = {
      ...this.getFormDefaults(),
      ...bankTransactionType,
    };
    return new FormGroup<BankTransactionTypeFormGroupContent>({
      id: new FormControl(
        { value: bankTransactionTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      transactionTypeCode: new FormControl(bankTransactionTypeRawValue.transactionTypeCode, {
        validators: [Validators.required],
      }),
      transactionTypeDetails: new FormControl(bankTransactionTypeRawValue.transactionTypeDetails, {
        validators: [Validators.required],
      }),
    });
  }

  getBankTransactionType(form: BankTransactionTypeFormGroup): IBankTransactionType | NewBankTransactionType {
    return form.getRawValue() as IBankTransactionType | NewBankTransactionType;
  }

  resetForm(form: BankTransactionTypeFormGroup, bankTransactionType: BankTransactionTypeFormGroupInput): void {
    const bankTransactionTypeRawValue = { ...this.getFormDefaults(), ...bankTransactionType };
    form.reset(
      {
        ...bankTransactionTypeRawValue,
        id: { value: bankTransactionTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): BankTransactionTypeFormDefaults {
    return {
      id: null,
    };
  }
}
