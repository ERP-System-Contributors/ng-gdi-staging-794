import { ILegalStatus, NewLegalStatus } from './legal-status.model';

export const sampleWithRequiredData: ILegalStatus = {
  id: 86374,
  legalStatusCode: 'payment orange',
  legalStatusType: 'Bedfordshire Lane',
};

export const sampleWithPartialData: ILegalStatus = {
  id: 44938,
  legalStatusCode: 'Customer',
  legalStatusType: 'Bacon',
};

export const sampleWithFullData: ILegalStatus = {
  id: 58710,
  legalStatusCode: 'value-added',
  legalStatusType: 'Michigan deposit Practical',
  legalStatusDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLegalStatus = {
  legalStatusCode: 'global Flats',
  legalStatusType: 'Liaison',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
