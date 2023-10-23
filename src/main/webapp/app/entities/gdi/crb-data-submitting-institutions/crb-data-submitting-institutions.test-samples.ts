import { ICrbDataSubmittingInstitutions, NewCrbDataSubmittingInstitutions } from './crb-data-submitting-institutions.model';

export const sampleWithRequiredData: ICrbDataSubmittingInstitutions = {
  id: 39299,
  institutionCode: 'Buckinghamshire Agent Leone',
  institutionName: 'open salmon Bedfordshire',
  institutionCategory: 'Shoes scalable',
};

export const sampleWithPartialData: ICrbDataSubmittingInstitutions = {
  id: 95059,
  institutionCode: 'indigo',
  institutionName: 'withdrawal Ameliorated',
  institutionCategory: 'viral Timor-Leste',
};

export const sampleWithFullData: ICrbDataSubmittingInstitutions = {
  id: 38160,
  institutionCode: 'violet payment Palau',
  institutionName: 'Field',
  institutionCategory: 'improvement Wooden',
};

export const sampleWithNewData: NewCrbDataSubmittingInstitutions = {
  institutionCode: 'Licensed',
  institutionName: 'Incredible homogeneous',
  institutionCategory: 'Carolina',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
