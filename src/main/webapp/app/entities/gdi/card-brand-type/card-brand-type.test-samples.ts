import { ICardBrandType, NewCardBrandType } from './card-brand-type.model';

export const sampleWithRequiredData: ICardBrandType = {
  id: 81832,
  cardBrandTypeCode: 'Market Interactions',
  cardBrandType: 'systemic',
};

export const sampleWithPartialData: ICardBrandType = {
  id: 85674,
  cardBrandTypeCode: 'virtual',
  cardBrandType: 'Ethiopian',
  cardBrandTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICardBrandType = {
  id: 12215,
  cardBrandTypeCode: 'Neck',
  cardBrandType: 'open-source Kids',
  cardBrandTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardBrandType = {
  cardBrandTypeCode: 'New',
  cardBrandType: 'Croatian',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
