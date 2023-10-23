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
