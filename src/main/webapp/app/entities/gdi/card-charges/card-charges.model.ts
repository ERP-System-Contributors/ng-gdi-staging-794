export interface ICardCharges {
  id: number;
  cardChargeType?: string | null;
  cardChargeTypeName?: string | null;
  cardChargeDetails?: string | null;
}

export type NewCardCharges = Omit<ICardCharges, 'id'> & { id: null };
