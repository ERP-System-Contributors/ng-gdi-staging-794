import { CardStateFlagTypes } from 'app/entities/enumerations/card-state-flag-types.model';

export interface ICardState {
  id: number;
  cardStateFlag?: CardStateFlagTypes | null;
  cardStateFlagDetails?: string | null;
  cardStateFlagDescription?: string | null;
}

export type NewCardState = Omit<ICardState, 'id'> & { id: null };
