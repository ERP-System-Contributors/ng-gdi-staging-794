import { ICardCharges, NewCardCharges } from './card-charges.model';

export const sampleWithRequiredData: ICardCharges = {
  id: 44501,
  cardChargeType: 'RAM indexing Sleek',
  cardChargeTypeName: 'bypassing',
};

export const sampleWithPartialData: ICardCharges = {
  id: 54770,
  cardChargeType: 'stable Universal',
  cardChargeTypeName: 'Ameliorated Communications',
};

export const sampleWithFullData: ICardCharges = {
  id: 13411,
  cardChargeType: 'utilisation',
  cardChargeTypeName: 'application orange',
  cardChargeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCardCharges = {
  cardChargeType: 'redefine Sausages',
  cardChargeTypeName: 'Belarus',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
