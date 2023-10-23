import { CardStateFlagTypes } from 'app/entities/enumerations/card-state-flag-types.model';

import { ICardState, NewCardState } from './card-state.model';

export const sampleWithRequiredData: ICardState = {
  id: 32887,
  cardStateFlag: CardStateFlagTypes['V'],
  cardStateFlagDetails: 'Automotive Rubber Turnpike',
};

export const sampleWithPartialData: ICardState = {
  id: 5969,
  cardStateFlag: CardStateFlagTypes['P'],
  cardStateFlagDetails: 'Pula relationships Orchestrator',
  cardStateFlagDescription: 'Exclusive time-frame Chicken',
};

export const sampleWithFullData: ICardState = {
  id: 71669,
  cardStateFlag: CardStateFlagTypes[undefined],
  cardStateFlagDetails: 'green',
  cardStateFlagDescription: 'Rubber',
};

export const sampleWithNewData: NewCardState = {
  cardStateFlag: CardStateFlagTypes[undefined],
  cardStateFlagDetails: 'indigo',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
