import { IFraudType, NewFraudType } from './fraud-type.model';

export const sampleWithRequiredData: IFraudType = {
  id: 74299,
  fraudTypeCode: 'Buckinghamshire',
  fraudType: 'Table bus Handmade',
};

export const sampleWithPartialData: IFraudType = {
  id: 63397,
  fraudTypeCode: 'Arkansas',
  fraudType: 'brand',
  fraudTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFraudType = {
  id: 63623,
  fraudTypeCode: 'Avenue',
  fraudType: 'withdrawal Taka',
  fraudTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFraudType = {
  fraudTypeCode: 'hacking services',
  fraudType: 'hacking needs-based',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
