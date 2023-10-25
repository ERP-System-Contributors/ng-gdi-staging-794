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

import { IContractStatus, NewContractStatus } from '../contract-status.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IContractStatus for edit and NewContractStatusFormGroupInput for create.
 */
type ContractStatusFormGroupInput = IContractStatus | PartialWithRequiredKeyOf<NewContractStatus>;

type ContractStatusFormDefaults = Pick<NewContractStatus, 'id'>;

type ContractStatusFormGroupContent = {
  id: FormControl<IContractStatus['id'] | NewContractStatus['id']>;
  contractStatusCode: FormControl<IContractStatus['contractStatusCode']>;
  contractStatusType: FormControl<IContractStatus['contractStatusType']>;
  contractStatusTypeDescription: FormControl<IContractStatus['contractStatusTypeDescription']>;
};

export type ContractStatusFormGroup = FormGroup<ContractStatusFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ContractStatusFormService {
  createContractStatusFormGroup(contractStatus: ContractStatusFormGroupInput = { id: null }): ContractStatusFormGroup {
    const contractStatusRawValue = {
      ...this.getFormDefaults(),
      ...contractStatus,
    };
    return new FormGroup<ContractStatusFormGroupContent>({
      id: new FormControl(
        { value: contractStatusRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      contractStatusCode: new FormControl(contractStatusRawValue.contractStatusCode, {
        validators: [Validators.required],
      }),
      contractStatusType: new FormControl(contractStatusRawValue.contractStatusType, {
        validators: [Validators.required],
      }),
      contractStatusTypeDescription: new FormControl(contractStatusRawValue.contractStatusTypeDescription),
    });
  }

  getContractStatus(form: ContractStatusFormGroup): IContractStatus | NewContractStatus {
    return form.getRawValue() as IContractStatus | NewContractStatus;
  }

  resetForm(form: ContractStatusFormGroup, contractStatus: ContractStatusFormGroupInput): void {
    const contractStatusRawValue = { ...this.getFormDefaults(), ...contractStatus };
    form.reset(
      {
        ...contractStatusRawValue,
        id: { value: contractStatusRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ContractStatusFormDefaults {
    return {
      id: null,
    };
  }
}
