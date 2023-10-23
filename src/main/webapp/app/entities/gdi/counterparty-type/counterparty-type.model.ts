export interface ICounterpartyType {
  id: number;
  counterpartyTypeCode?: string | null;
  counterPartyType?: string | null;
  counterpartyTypeDescription?: string | null;
}

export type NewCounterpartyType = Omit<ICounterpartyType, 'id'> & { id: null };
