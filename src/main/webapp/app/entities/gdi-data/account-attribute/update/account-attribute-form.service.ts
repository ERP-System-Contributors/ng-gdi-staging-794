import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountAttribute, NewAccountAttribute } from '../account-attribute.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountAttribute for edit and NewAccountAttributeFormGroupInput for create.
 */
type AccountAttributeFormGroupInput = IAccountAttribute | PartialWithRequiredKeyOf<NewAccountAttribute>;

type AccountAttributeFormDefaults = Pick<NewAccountAttribute, 'id'>;

type AccountAttributeFormGroupContent = {
  id: FormControl<IAccountAttribute['id'] | NewAccountAttribute['id']>;
  reportingDate: FormControl<IAccountAttribute['reportingDate']>;
  customerNumber: FormControl<IAccountAttribute['customerNumber']>;
  accountContractNumber: FormControl<IAccountAttribute['accountContractNumber']>;
  accountName: FormControl<IAccountAttribute['accountName']>;
  accountOpeningDate: FormControl<IAccountAttribute['accountOpeningDate']>;
  accountClosingDate: FormControl<IAccountAttribute['accountClosingDate']>;
  debitInterestRate: FormControl<IAccountAttribute['debitInterestRate']>;
  creditInterestRate: FormControl<IAccountAttribute['creditInterestRate']>;
  sanctionedAccountLimitFcy: FormControl<IAccountAttribute['sanctionedAccountLimitFcy']>;
  sanctionedAccountLimitLcy: FormControl<IAccountAttribute['sanctionedAccountLimitLcy']>;
  accountStatusChangeDate: FormControl<IAccountAttribute['accountStatusChangeDate']>;
  expiryDate: FormControl<IAccountAttribute['expiryDate']>;
  bankCode: FormControl<IAccountAttribute['bankCode']>;
  branchCode: FormControl<IAccountAttribute['branchCode']>;
  accountOwnershipType: FormControl<IAccountAttribute['accountOwnershipType']>;
};

export type AccountAttributeFormGroup = FormGroup<AccountAttributeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountAttributeFormService {
  createAccountAttributeFormGroup(accountAttribute: AccountAttributeFormGroupInput = { id: null }): AccountAttributeFormGroup {
    const accountAttributeRawValue = {
      ...this.getFormDefaults(),
      ...accountAttribute,
    };
    return new FormGroup<AccountAttributeFormGroupContent>({
      id: new FormControl(
        { value: accountAttributeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(accountAttributeRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      customerNumber: new FormControl(accountAttributeRawValue.customerNumber, {
        validators: [Validators.required],
      }),
      accountContractNumber: new FormControl(accountAttributeRawValue.accountContractNumber, {
        validators: [Validators.required],
      }),
      accountName: new FormControl(accountAttributeRawValue.accountName, {
        validators: [Validators.required],
      }),
      accountOpeningDate: new FormControl(accountAttributeRawValue.accountOpeningDate),
      accountClosingDate: new FormControl(accountAttributeRawValue.accountClosingDate),
      debitInterestRate: new FormControl(accountAttributeRawValue.debitInterestRate, {
        validators: [Validators.required],
      }),
      creditInterestRate: new FormControl(accountAttributeRawValue.creditInterestRate, {
        validators: [Validators.required],
      }),
      sanctionedAccountLimitFcy: new FormControl(accountAttributeRawValue.sanctionedAccountLimitFcy, {
        validators: [Validators.required],
      }),
      sanctionedAccountLimitLcy: new FormControl(accountAttributeRawValue.sanctionedAccountLimitLcy, {
        validators: [Validators.required],
      }),
      accountStatusChangeDate: new FormControl(accountAttributeRawValue.accountStatusChangeDate),
      expiryDate: new FormControl(accountAttributeRawValue.expiryDate),
      bankCode: new FormControl(accountAttributeRawValue.bankCode, {
        validators: [Validators.required],
      }),
      branchCode: new FormControl(accountAttributeRawValue.branchCode, {
        validators: [Validators.required],
      }),
      accountOwnershipType: new FormControl(accountAttributeRawValue.accountOwnershipType, {
        validators: [Validators.required],
      }),
    });
  }

  getAccountAttribute(form: AccountAttributeFormGroup): IAccountAttribute | NewAccountAttribute {
    return form.getRawValue() as IAccountAttribute | NewAccountAttribute;
  }

  resetForm(form: AccountAttributeFormGroup, accountAttribute: AccountAttributeFormGroupInput): void {
    const accountAttributeRawValue = { ...this.getFormDefaults(), ...accountAttribute };
    form.reset(
      {
        ...accountAttributeRawValue,
        id: { value: accountAttributeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountAttributeFormDefaults {
    return {
      id: null,
    };
  }
}
