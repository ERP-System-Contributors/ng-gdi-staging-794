import { IFxRateType, NewFxRateType } from './fx-rate-type.model';

export const sampleWithRequiredData: IFxRateType = {
  id: 18538,
  fxRateCode: 'aggregate',
  fxRateType: 'Global teal quantify',
};

export const sampleWithPartialData: IFxRateType = {
  id: 45625,
  fxRateCode: 'ivory',
  fxRateType: 'background Games',
  fxRateDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFxRateType = {
  id: 76426,
  fxRateCode: 'extend Accounts enhance',
  fxRateType: 'yellow',
  fxRateDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFxRateType = {
  fxRateCode: 'Integration wireless',
  fxRateType: 'Quality Intelligent methodology',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
