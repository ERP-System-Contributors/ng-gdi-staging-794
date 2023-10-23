import { ICardTypes, NewCardTypes } from './card-types.model';

export const sampleWithRequiredData: ICardTypes = {
  id: 72117,
  cardTypeCode: 'Frozen invoice',
  cardType: 'Direct Manager',
};

export const sampleWithPartialData: ICardTypes = {
  id: 10848,
  cardTypeCode: 'Oval Handmade',
  cardType: 'Usability Account',
};

export const sampleWithFullData: ICardTypes = {
  id: 72890,
  cardTypeCode: 'GB Investor',
  cardType: 'matrix',
  cardTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardTypes = {
  cardTypeCode: 'Division',
  cardType: 'Pizza deposit Florida',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
