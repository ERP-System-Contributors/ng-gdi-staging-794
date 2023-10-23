import { CounterpartyCategory } from 'app/entities/enumerations/counterparty-category.model';

export interface ICounterPartyCategory {
  id: number;
  counterpartyCategoryCode?: string | null;
  counterpartyCategoryCodeDetails?: CounterpartyCategory | null;
  counterpartyCategoryDescription?: string | null;
}

export type NewCounterPartyCategory = Omit<ICounterPartyCategory, 'id'> & { id: null };
