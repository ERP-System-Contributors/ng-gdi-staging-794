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

import { IAgentBankingActivity, NewAgentBankingActivity } from '../agent-banking-activity.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAgentBankingActivity for edit and NewAgentBankingActivityFormGroupInput for create.
 */
type AgentBankingActivityFormGroupInput = IAgentBankingActivity | PartialWithRequiredKeyOf<NewAgentBankingActivity>;

type AgentBankingActivityFormDefaults = Pick<NewAgentBankingActivity, 'id'>;

type AgentBankingActivityFormGroupContent = {
  id: FormControl<IAgentBankingActivity['id'] | NewAgentBankingActivity['id']>;
  reportingDate: FormControl<IAgentBankingActivity['reportingDate']>;
  agentUniqueId: FormControl<IAgentBankingActivity['agentUniqueId']>;
  terminalUniqueId: FormControl<IAgentBankingActivity['terminalUniqueId']>;
  totalCountOfTransactions: FormControl<IAgentBankingActivity['totalCountOfTransactions']>;
  totalValueOfTransactionsInLCY: FormControl<IAgentBankingActivity['totalValueOfTransactionsInLCY']>;
  bankCode: FormControl<IAgentBankingActivity['bankCode']>;
  branchCode: FormControl<IAgentBankingActivity['branchCode']>;
  transactionType: FormControl<IAgentBankingActivity['transactionType']>;
};

export type AgentBankingActivityFormGroup = FormGroup<AgentBankingActivityFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AgentBankingActivityFormService {
  createAgentBankingActivityFormGroup(
    agentBankingActivity: AgentBankingActivityFormGroupInput = { id: null }
  ): AgentBankingActivityFormGroup {
    const agentBankingActivityRawValue = {
      ...this.getFormDefaults(),
      ...agentBankingActivity,
    };
    return new FormGroup<AgentBankingActivityFormGroupContent>({
      id: new FormControl(
        { value: agentBankingActivityRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      reportingDate: new FormControl(agentBankingActivityRawValue.reportingDate, {
        validators: [Validators.required],
      }),
      agentUniqueId: new FormControl(agentBankingActivityRawValue.agentUniqueId, {
        validators: [Validators.required],
      }),
      terminalUniqueId: new FormControl(agentBankingActivityRawValue.terminalUniqueId, {
        validators: [Validators.required],
      }),
      totalCountOfTransactions: new FormControl(agentBankingActivityRawValue.totalCountOfTransactions, {
        validators: [Validators.required, Validators.min(0)],
      }),
      totalValueOfTransactionsInLCY: new FormControl(agentBankingActivityRawValue.totalValueOfTransactionsInLCY, {
        validators: [Validators.required, Validators.min(0)],
      }),
      bankCode: new FormControl(agentBankingActivityRawValue.bankCode, {
        validators: [Validators.required],
      }),
      branchCode: new FormControl(agentBankingActivityRawValue.branchCode, {
        validators: [Validators.required],
      }),
      transactionType: new FormControl(agentBankingActivityRawValue.transactionType, {
        validators: [Validators.required],
      }),
    });
  }

  getAgentBankingActivity(form: AgentBankingActivityFormGroup): IAgentBankingActivity | NewAgentBankingActivity {
    return form.getRawValue() as IAgentBankingActivity | NewAgentBankingActivity;
  }

  resetForm(form: AgentBankingActivityFormGroup, agentBankingActivity: AgentBankingActivityFormGroupInput): void {
    const agentBankingActivityRawValue = { ...this.getFormDefaults(), ...agentBankingActivity };
    form.reset(
      {
        ...agentBankingActivityRawValue,
        id: { value: agentBankingActivityRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AgentBankingActivityFormDefaults {
    return {
      id: null,
    };
  }
}
