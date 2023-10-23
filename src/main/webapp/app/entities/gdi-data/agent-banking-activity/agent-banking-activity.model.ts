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

import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { IBankTransactionType } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.model';

export interface IAgentBankingActivity {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  agentUniqueId?: string | null;
  terminalUniqueId?: string | null;
  totalCountOfTransactions?: number | null;
  totalValueOfTransactionsInLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchCode?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  transactionType?: Pick<IBankTransactionType, 'id' | 'transactionTypeCode'> | null;
}

export type NewAgentBankingActivity = Omit<IAgentBankingActivity, 'id'> & { id: null };
