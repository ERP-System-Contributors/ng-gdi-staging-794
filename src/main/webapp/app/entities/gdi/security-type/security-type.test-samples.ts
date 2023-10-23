import { ISecurityType, NewSecurityType } from './security-type.model';

export const sampleWithRequiredData: ISecurityType = {
  id: 24614,
  securityTypeCode: 'Unbranded',
  securityType: 'Handmade invoice',
};

export const sampleWithPartialData: ISecurityType = {
  id: 34780,
  securityTypeCode: 'Branding e-business',
  securityType: 'motivating Auto visionary',
};

export const sampleWithFullData: ISecurityType = {
  id: 40984,
  securityTypeCode: 'Carolina generate Vanuatu',
  securityType: 'Spain User-centric',
  securityTypeDetails: '../fake-data/blob/hipster.txt',
  securityTypeDescription: 'fuchsia Rustic Credit',
};

export const sampleWithNewData: NewSecurityType = {
  securityTypeCode: 'green Intelligent',
  securityType: 'Palladium Refined calculating',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
