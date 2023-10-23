import { ISecurityTenure, NewSecurityTenure } from './security-tenure.model';

export const sampleWithRequiredData: ISecurityTenure = {
  id: 6623,
  securityTenureCode: 'magnetic Streamlined Producer',
  securityTenureType: 'Tanzania',
};

export const sampleWithPartialData: ISecurityTenure = {
  id: 63662,
  securityTenureCode: 'alarm',
  securityTenureType: 'expedite virtual',
};

export const sampleWithFullData: ISecurityTenure = {
  id: 27632,
  securityTenureCode: 'SQL connect up',
  securityTenureType: 'compressing heuristic redundant',
  securityTenureDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewSecurityTenure = {
  securityTenureCode: 'matrix Forge',
  securityTenureType: 'Concrete SMTP Dollar',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
