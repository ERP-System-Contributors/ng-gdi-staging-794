export interface IBankTransactionType {
  id: number;
  transactionTypeCode?: string | null;
  transactionTypeDetails?: string | null;
}

export type NewBankTransactionType = Omit<IBankTransactionType, 'id'> & { id: null };
