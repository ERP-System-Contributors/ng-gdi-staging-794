export interface ILoanApplicationStatus {
  id: number;
  loanApplicationStatusTypeCode?: string | null;
  loanApplicationStatusType?: string | null;
  loanApplicationStatusDetails?: string | null;
}

export type NewLoanApplicationStatus = Omit<ILoanApplicationStatus, 'id'> & { id: null };
