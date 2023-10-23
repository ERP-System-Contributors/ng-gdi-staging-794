import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IBankBranchCode } from 'app/entities/gdi/bank-branch-code/bank-branch-code.model';
import { IAccountOwnershipType } from 'app/entities/gdi/account-ownership-type/account-ownership-type.model';

export interface IAccountAttribute {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  customerNumber?: string | null;
  accountContractNumber?: string | null;
  accountName?: string | null;
  accountOpeningDate?: dayjs.Dayjs | null;
  accountClosingDate?: dayjs.Dayjs | null;
  debitInterestRate?: number | null;
  creditInterestRate?: number | null;
  sanctionedAccountLimitFcy?: number | null;
  sanctionedAccountLimitLcy?: number | null;
  accountStatusChangeDate?: dayjs.Dayjs | null;
  expiryDate?: dayjs.Dayjs | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionCode'> | null;
  branchCode?: Pick<IBankBranchCode, 'id' | 'branchCode'> | null;
  accountOwnershipType?: Pick<IAccountOwnershipType, 'id' | 'accountOwnershipType'> | null;
}

export type NewAccountAttribute = Omit<IAccountAttribute, 'id'> & { id: null };
