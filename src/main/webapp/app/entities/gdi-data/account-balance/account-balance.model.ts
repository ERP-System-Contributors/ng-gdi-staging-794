import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';

export interface IAccountBalance {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  customerId?: string | null;
  accountContractNumber?: string | null;
  accruedInterestBalanceFCY?: number | null;
  accruedInterestBalanceLCY?: number | null;
  accountBalanceFCY?: number | null;
  accountBalanceLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  branchId?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  currencyCode?: Pick<IIsoCurrencyCode, 'id' | 'alphabeticCode'> | null;
}

export type NewAccountBalance = Omit<IAccountBalance, 'id'> & { id: null };
