import { ISourcesOfFundsTypeCode, NewSourcesOfFundsTypeCode } from './sources-of-funds-type-code.model';

export const sampleWithRequiredData: ISourcesOfFundsTypeCode = {
  id: 22900,
  sourceOfFundsTypeCode: 'index International revolutionize',
  sourceOfFundsType: 'Views orange Thailand',
};

export const sampleWithPartialData: ISourcesOfFundsTypeCode = {
  id: 36656,
  sourceOfFundsTypeCode: 'Tuna optical',
  sourceOfFundsType: 'Grocery Associate',
};

export const sampleWithFullData: ISourcesOfFundsTypeCode = {
  id: 76893,
  sourceOfFundsTypeCode: 'HTTP compress',
  sourceOfFundsType: 'Towels',
  sourceOfFundsTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewSourcesOfFundsTypeCode = {
  sourceOfFundsTypeCode: 'invoice Borders connecting',
  sourceOfFundsType: 'Paradigm',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
