import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAccountStatusType, NewAccountStatusType } from '../account-status-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountStatusType for edit and NewAccountStatusTypeFormGroupInput for create.
 */
type AccountStatusTypeFormGroupInput = IAccountStatusType | PartialWithRequiredKeyOf<NewAccountStatusType>;

type AccountStatusTypeFormDefaults = Pick<NewAccountStatusType, 'id'>;

type AccountStatusTypeFormGroupContent = {
  id: FormControl<IAccountStatusType['id'] | NewAccountStatusType['id']>;
  accountStatusCode: FormControl<IAccountStatusType['accountStatusCode']>;
  accountStatusType: FormControl<IAccountStatusType['accountStatusType']>;
  accountStatusDescription: FormControl<IAccountStatusType['accountStatusDescription']>;
};

export type AccountStatusTypeFormGroup = FormGroup<AccountStatusTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountStatusTypeFormService {
  createAccountStatusTypeFormGroup(accountStatusType: AccountStatusTypeFormGroupInput = { id: null }): AccountStatusTypeFormGroup {
    const accountStatusTypeRawValue = {
      ...this.getFormDefaults(),
      ...accountStatusType,
    };
    return new FormGroup<AccountStatusTypeFormGroupContent>({
      id: new FormControl(
        { value: accountStatusTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountStatusCode: new FormControl(accountStatusTypeRawValue.accountStatusCode, {
        validators: [Validators.required],
      }),
      accountStatusType: new FormControl(accountStatusTypeRawValue.accountStatusType, {
        validators: [Validators.required],
      }),
      accountStatusDescription: new FormControl(accountStatusTypeRawValue.accountStatusDescription),
    });
  }

  getAccountStatusType(form: AccountStatusTypeFormGroup): IAccountStatusType | NewAccountStatusType {
    return form.getRawValue() as IAccountStatusType | NewAccountStatusType;
  }

  resetForm(form: AccountStatusTypeFormGroup, accountStatusType: AccountStatusTypeFormGroupInput): void {
    const accountStatusTypeRawValue = { ...this.getFormDefaults(), ...accountStatusType };
    form.reset(
      {
        ...accountStatusTypeRawValue,
        id: { value: accountStatusTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountStatusTypeFormDefaults {
    return {
      id: null,
    };
  }
}
