export interface ICounterPartyDealType {
  id: number;
  counterpartyDealCode?: string | null;
  counterpartyDealTypeDetails?: string | null;
  counterpartyDealTypeDescription?: string | null;
}

export type NewCounterPartyDealType = Omit<ICounterPartyDealType, 'id'> & { id: null };
