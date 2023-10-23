export interface IFxTransactionType {
  id: number;
  fxTransactionTypeCode?: string | null;
  fxTransactionType?: string | null;
  fxTransactionTypeDescription?: string | null;
}

export type NewFxTransactionType = Omit<IFxTransactionType, 'id'> & { id: null };
