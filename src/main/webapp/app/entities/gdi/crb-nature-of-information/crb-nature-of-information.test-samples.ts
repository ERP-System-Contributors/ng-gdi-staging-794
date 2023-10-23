import { ICrbNatureOfInformation, NewCrbNatureOfInformation } from './crb-nature-of-information.model';

export const sampleWithRequiredData: ICrbNatureOfInformation = {
  id: 169,
  natureOfInformationTypeCode: 'XSS Officer Alabama',
  natureOfInformationType: 'Street',
};

export const sampleWithPartialData: ICrbNatureOfInformation = {
  id: 2808,
  natureOfInformationTypeCode: 'circuit Chips Virgin',
  natureOfInformationType: 'Metal Vietnam sensor',
  natureOfInformationTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbNatureOfInformation = {
  id: 63224,
  natureOfInformationTypeCode: 'Auto Regional',
  natureOfInformationType: 'vortals',
  natureOfInformationTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbNatureOfInformation = {
  natureOfInformationTypeCode: 'Frozen',
  natureOfInformationType: 'mesh cohesive invoice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
