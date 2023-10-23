import { ISecurityClassificationType, NewSecurityClassificationType } from './security-classification-type.model';

export const sampleWithRequiredData: ISecurityClassificationType = {
  id: 83066,
  securityClassificationTypeCode: 'bypass 1080p Chief',
  securityClassificationType: 'Paradigm',
};

export const sampleWithPartialData: ISecurityClassificationType = {
  id: 70439,
  securityClassificationTypeCode: 'Concrete Cambridgeshire Shore',
  securityClassificationType: 'compress',
  securityClassificationDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ISecurityClassificationType = {
  id: 5917,
  securityClassificationTypeCode: 'leverage bandwidth Engineer',
  securityClassificationType: 'Account',
  securityClassificationDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewSecurityClassificationType = {
  securityClassificationTypeCode: 'Ukraine',
  securityClassificationType: 'Kentucky Persevering',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
