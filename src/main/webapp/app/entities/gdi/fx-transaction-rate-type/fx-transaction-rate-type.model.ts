export interface IFxTransactionRateType {
  id: number;
  fxTransactionRateTypeCode?: string | null;
  fxTransactionRateType?: string | null;
  fxTransactionRateTypeDetails?: string | null;
}

export type NewFxTransactionRateType = Omit<IFxTransactionRateType, 'id'> & { id: null };
