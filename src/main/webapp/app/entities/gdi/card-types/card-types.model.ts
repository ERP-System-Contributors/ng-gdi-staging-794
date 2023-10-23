export interface ICardTypes {
  id: number;
  cardTypeCode?: string | null;
  cardType?: string | null;
  cardTypeDetails?: string | null;
}

export type NewCardTypes = Omit<ICardTypes, 'id'> & { id: null };
