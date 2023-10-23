import { LoanAccountMutationTypes } from 'app/entities/enumerations/loan-account-mutation-types.model';

export interface ILoanAccountCategory {
  id: number;
  loanAccountMutationCode?: string | null;
  loanAccountMutationType?: LoanAccountMutationTypes | null;
  loanAccountMutationDetails?: string | null;
  loanAccountMutationDescription?: string | null;
}

export type NewLoanAccountCategory = Omit<ILoanAccountCategory, 'id'> & { id: null };
