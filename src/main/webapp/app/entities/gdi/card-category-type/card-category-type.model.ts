import { CardCategoryFlag } from 'app/entities/enumerations/card-category-flag.model';

export interface ICardCategoryType {
  id: number;
  cardCategoryFlag?: CardCategoryFlag | null;
  cardCategoryDescription?: string | null;
  cardCategoryDetails?: string | null;
}

export type NewCardCategoryType = Omit<ICardCategoryType, 'id'> & { id: null };
