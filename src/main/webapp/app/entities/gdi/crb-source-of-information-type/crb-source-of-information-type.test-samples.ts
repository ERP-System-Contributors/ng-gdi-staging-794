import { ICrbSourceOfInformationType, NewCrbSourceOfInformationType } from './crb-source-of-information-type.model';

export const sampleWithRequiredData: ICrbSourceOfInformationType = {
  id: 3568,
  sourceOfInformationTypeCode: 'USB Escudo port',
};

export const sampleWithPartialData: ICrbSourceOfInformationType = {
  id: 35306,
  sourceOfInformationTypeCode: 'Human',
};

export const sampleWithFullData: ICrbSourceOfInformationType = {
  id: 42559,
  sourceOfInformationTypeCode: 'hack',
  sourceOfInformationTypeDescription: 'EXE Car Developer',
};

export const sampleWithNewData: NewCrbSourceOfInformationType = {
  sourceOfInformationTypeCode: 'Loan fuchsia Identity',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
