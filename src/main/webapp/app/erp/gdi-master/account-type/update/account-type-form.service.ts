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

import { IAccountType, NewAccountType } from '../account-type.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAccountType for edit and NewAccountTypeFormGroupInput for create.
 */
type AccountTypeFormGroupInput = IAccountType | PartialWithRequiredKeyOf<NewAccountType>;

type AccountTypeFormDefaults = Pick<NewAccountType, 'id'>;

type AccountTypeFormGroupContent = {
  id: FormControl<IAccountType['id'] | NewAccountType['id']>;
  accountTypeCode: FormControl<IAccountType['accountTypeCode']>;
  accountType: FormControl<IAccountType['accountType']>;
  description: FormControl<IAccountType['description']>;
};

export type AccountTypeFormGroup = FormGroup<AccountTypeFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AccountTypeFormService {
  createAccountTypeFormGroup(accountType: AccountTypeFormGroupInput = { id: null }): AccountTypeFormGroup {
    const accountTypeRawValue = {
      ...this.getFormDefaults(),
      ...accountType,
    };
    return new FormGroup<AccountTypeFormGroupContent>({
      id: new FormControl(
        { value: accountTypeRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      accountTypeCode: new FormControl(accountTypeRawValue.accountTypeCode, {
        validators: [Validators.required],
      }),
      accountType: new FormControl(accountTypeRawValue.accountType),
      description: new FormControl(accountTypeRawValue.description),
    });
  }

  getAccountType(form: AccountTypeFormGroup): IAccountType | NewAccountType {
    return form.getRawValue() as IAccountType | NewAccountType;
  }

  resetForm(form: AccountTypeFormGroup, accountType: AccountTypeFormGroupInput): void {
    const accountTypeRawValue = { ...this.getFormDefaults(), ...accountType };
    form.reset(
      {
        ...accountTypeRawValue,
        id: { value: accountTypeRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AccountTypeFormDefaults {
    return {
      id: null,
    };
  }
}
