export interface ILoanPerformanceClassification {
  id: number;
  loanPerformanceClassificationCode?: string | null;
  loanPerformanceClassificationType?: string | null;
  commercialBankDescription?: string | null;
  microfinanceDescription?: string | null;
}

export type NewLoanPerformanceClassification = Omit<ILoanPerformanceClassification, 'id'> & { id: null };
