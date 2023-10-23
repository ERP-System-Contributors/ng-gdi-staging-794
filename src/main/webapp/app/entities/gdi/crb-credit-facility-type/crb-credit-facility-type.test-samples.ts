import { ICrbCreditFacilityType, NewCrbCreditFacilityType } from './crb-credit-facility-type.model';

export const sampleWithRequiredData: ICrbCreditFacilityType = {
  id: 66384,
  creditFacilityTypeCode: 'copy disintermediate',
  creditFacilityType: 'vortals',
};

export const sampleWithPartialData: ICrbCreditFacilityType = {
  id: 79595,
  creditFacilityTypeCode: 'Lari B2C',
  creditFacilityType: 'Sausages',
};

export const sampleWithFullData: ICrbCreditFacilityType = {
  id: 88663,
  creditFacilityTypeCode: 'Strategist grey Alaska',
  creditFacilityType: 'Savings invoice',
  creditFacilityDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbCreditFacilityType = {
  creditFacilityTypeCode: 'utilize Licensed',
  creditFacilityType: 'Cotton programming invoice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
