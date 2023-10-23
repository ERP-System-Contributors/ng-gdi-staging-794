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
