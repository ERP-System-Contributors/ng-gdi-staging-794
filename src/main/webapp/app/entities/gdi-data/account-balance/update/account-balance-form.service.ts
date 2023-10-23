import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountBalance, NewAccountBalance } from '../account-balance.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountBalance for edit and NewAccountBalanceFormGroupInput for create.
 */
type AccountBalanceFormGroupInput = IAccountBalance | PartialWithRequiredKeyOf<NewAccountBalance>;

type AccountBalanceFormDefaults = Pick<NewAccountBalance, 'id'>;

type AccountBalanceFormGroupContent = {
  id: FormControl<IAccountBalance['id'] | NewAccountBalance['id']>;
  reportingDate: FormControl<IAccountBalance['reportingDate']>;
  customerId: FormControl<IAccountBalance['customerId']>;
  accountContractNumber: FormControl<IAccountBalance['accountContractNumber']>;
  accruedInterestBalanceFCY: FormControl<IAccountBalance['accruedInterestBalanceFCY']>;
  accruedInterestBalanceLCY: FormControl<IAccountBalance['accruedInterestBalanceLCY']>;
  accountBalanceFCY: FormControl<IAccountBalance['accountBalanceFCY']>;
  accountBalanceLCY: FormControl<IAccountBalance['accountBalanceLCY']>;
  bankCode: FormControl<IAccountBalance['bankCode']>;
  branchId: FormControl<IAccountBalance['branchId']>;
  currencyCode: FormControl<IAccountBalance['currencyCode']>;
};

export type AccountBalanceFormGroup = FormGroup<AccountBalanceFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountBalanceFormService {
  createAccountBalanceFormGroup(accountBalance: AccountBalanceFormGroupInput = { id: null }): AccountBalanceFormGroup {
    const accountBalanceRawValue = {
      ...this.getFormDefaults(),
      ...accountBalance,
    };
    return new FormGroup<AccountBalanceFormGroupContent>({
      id: new FormControl(
        { value: accountBalanceRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(accountBalanceRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      customerId: new FormControl(accountBalanceRawValue.customerId, {
        validators: [Validators.required],
      }),
      accountContractNumber: new FormControl(accountBalanceRawValue.accountContractNumber, {
        validators: [Validators.required, Validators.minLength(12), Validators.maxLength(16), Validators.pattern('^\\d{15}$')],
      }),
      accruedInterestBalanceFCY: new FormControl(accountBalanceRawValue.accruedInterestBalanceFCY, {
        validators: [Validators.required],
      }),
      accruedInterestBalanceLCY: new FormControl(accountBalanceRawValue.accruedInterestBalanceLCY, {
        validators: [Validators.required],
      }),
      accountBalanceFCY: new FormControl(accountBalanceRawValue.accountBalanceFCY, {
        validators: [Validators.required],
      }),
      accountBalanceLCY: new FormControl(accountBalanceRawValue.accountBalanceLCY, {
        validators: [Validators.required],
      }),
      bankCode: new FormControl(accountBalanceRawValue.bankCode, {
        validators: [Validators.required],
      }),
      branchId: new FormControl(accountBalanceRawValue.branchId, {
        validators: [Validators.required],
      }),
      currencyCode: new FormControl(accountBalanceRawValue.currencyCode, {
        validators: [Validators.required],
      }),
    });
  }

  getAccountBalance(form: AccountBalanceFormGroup): IAccountBalance | NewAccountBalance {
    return form.getRawValue() as IAccountBalance | NewAccountBalance;
  }

  resetForm(form: AccountBalanceFormGroup, accountBalance: AccountBalanceFormGroupInput): void {
    const accountBalanceRawValue = { ...this.getFormDefaults(), ...accountBalance };
    form.reset(
      {
        ...accountBalanceRawValue,
        id: { value: accountBalanceRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountBalanceFormDefaults {
    return {
      id: null,
    };
  }
}
