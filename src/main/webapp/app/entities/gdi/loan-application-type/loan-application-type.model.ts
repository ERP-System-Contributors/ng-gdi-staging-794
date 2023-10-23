export interface ILoanApplicationType {
  id: number;
  loanApplicationTypeCode?: string | null;
  loanApplicationType?: string | null;
  loanApplicationDetails?: string | null;
}

export type NewLoanApplicationType = Omit<ILoanApplicationType, 'id'> & { id: null };
