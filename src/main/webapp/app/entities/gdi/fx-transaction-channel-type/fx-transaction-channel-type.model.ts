export interface IFxTransactionChannelType {
  id: number;
  fxTransactionChannelCode?: string | null;
  fxTransactionChannelType?: string | null;
  fxChannelTypeDetails?: string | null;
}

export type NewFxTransactionChannelType = Omit<IFxTransactionChannelType, 'id'> & { id: null };
