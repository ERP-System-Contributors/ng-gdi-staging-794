export interface ILoanRepaymentFrequency {
  id: number;
  frequencyTypeCode?: string | null;
  frequencyType?: string | null;
  frequencyTypeDetails?: string | null;
}

export type NewLoanRepaymentFrequency = Omit<ILoanRepaymentFrequency, 'id'> & { id: null };
