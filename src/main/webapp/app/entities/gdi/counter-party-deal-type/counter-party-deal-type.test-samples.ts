import { ICounterPartyDealType, NewCounterPartyDealType } from './counter-party-deal-type.model';

export const sampleWithRequiredData: ICounterPartyDealType = {
  id: 10842,
  counterpartyDealCode: 'Bridge web ability',
  counterpartyDealTypeDetails: 'Books haptic Gardens',
};

export const sampleWithPartialData: ICounterPartyDealType = {
  id: 9009,
  counterpartyDealCode: 'Corporate Salad International',
  counterpartyDealTypeDetails: 'Savings Maryland',
  counterpartyDealTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICounterPartyDealType = {
  id: 38626,
  counterpartyDealCode: 'De-engineered complexity',
  counterpartyDealTypeDetails: 'Cotton systems',
  counterpartyDealTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCounterPartyDealType = {
  counterpartyDealCode: 'magenta quantify',
  counterpartyDealTypeDetails: 'copy killer',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
