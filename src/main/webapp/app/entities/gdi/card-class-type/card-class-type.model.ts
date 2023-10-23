export interface ICardClassType {
  id: number;
  cardClassTypeCode?: string | null;
  cardClassType?: string | null;
  cardClassDetails?: string | null;
}

export type NewCardClassType = Omit<ICardClassType, 'id'> & { id: null };
