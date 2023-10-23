import { IAgriculturalEnterpriseActivityType, NewAgriculturalEnterpriseActivityType } from './agricultural-enterprise-activity-type.model';

export const sampleWithRequiredData: IAgriculturalEnterpriseActivityType = {
  id: 69868,
  agriculturalEnterpriseActivityTypeCode: 'Rustic salmon',
  agriculturalEnterpriseActivityType: 'customized',
};

export const sampleWithPartialData: IAgriculturalEnterpriseActivityType = {
  id: 26431,
  agriculturalEnterpriseActivityTypeCode: 'Guam',
  agriculturalEnterpriseActivityType: 'experiences',
};

export const sampleWithFullData: IAgriculturalEnterpriseActivityType = {
  id: 10305,
  agriculturalEnterpriseActivityTypeCode: 'initiatives alarm Pizza',
  agriculturalEnterpriseActivityType: 'Drives',
  agriculturalEnterpriseActivityTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAgriculturalEnterpriseActivityType = {
  agriculturalEnterpriseActivityTypeCode: 'Corporate green',
  agriculturalEnterpriseActivityType: 'Human indexing Account',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
