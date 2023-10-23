import { IInstitutionStatusType, NewInstitutionStatusType } from './institution-status-type.model';

export const sampleWithRequiredData: IInstitutionStatusType = {
  id: 67283,
  institutionStatusCode: 'Unbranded strategic real-time',
};

export const sampleWithPartialData: IInstitutionStatusType = {
  id: 16054,
  institutionStatusCode: 'Analyst multi-byte',
  institutionStatusType: 'Ports Mouse bypass',
  insitutionStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IInstitutionStatusType = {
  id: 71566,
  institutionStatusCode: 'Cambridgeshire',
  institutionStatusType: 'Sleek',
  insitutionStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewInstitutionStatusType = {
  institutionStatusCode: 'Global wireless Key',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
