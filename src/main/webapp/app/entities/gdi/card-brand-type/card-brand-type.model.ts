export interface ICardBrandType {
  id: number;
  cardBrandTypeCode?: string | null;
  cardBrandType?: string | null;
  cardBrandTypeDetails?: string | null;
}

export type NewCardBrandType = Omit<ICardBrandType, 'id'> & { id: null };
