export interface ILoanDeclineReason {
  id: number;
  loanDeclineReasonTypeCode?: string | null;
  loanDeclineReasonType?: string | null;
  loanDeclineReasonDetails?: string | null;
}

export type NewLoanDeclineReason = Omit<ILoanDeclineReason, 'id'> & { id: null };
