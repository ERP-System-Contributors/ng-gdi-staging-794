import { IAcquiringIssuingFlag, NewAcquiringIssuingFlag } from './acquiring-issuing-flag.model';

export const sampleWithRequiredData: IAcquiringIssuingFlag = {
  id: 75107,
  cardAcquiringIssuingFlagCode: 'Buckinghamshire quantify Concrete',
  cardAcquiringIssuingDescription: 'GB implement connect',
};

export const sampleWithPartialData: IAcquiringIssuingFlag = {
  id: 60909,
  cardAcquiringIssuingFlagCode: 'Metal Future Communications',
  cardAcquiringIssuingDescription: 'infomediaries Account Avon',
  cardAcquiringIssuingDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IAcquiringIssuingFlag = {
  id: 29708,
  cardAcquiringIssuingFlagCode: 'facilitate Dollar) Gloves',
  cardAcquiringIssuingDescription: 'Wooden aggregate purple',
  cardAcquiringIssuingDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAcquiringIssuingFlag = {
  cardAcquiringIssuingFlagCode: 'web-enabled back-end',
  cardAcquiringIssuingDescription: 'reintermediate infrastructure navigating',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
