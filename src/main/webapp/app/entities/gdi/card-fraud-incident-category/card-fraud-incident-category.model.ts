export interface ICardFraudIncidentCategory {
  id: number;
  cardFraudCategoryTypeCode?: string | null;
  cardFraudCategoryType?: string | null;
  cardFraudCategoryTypeDescription?: string | null;
}

export type NewCardFraudIncidentCategory = Omit<ICardFraudIncidentCategory, 'id'> & { id: null };
