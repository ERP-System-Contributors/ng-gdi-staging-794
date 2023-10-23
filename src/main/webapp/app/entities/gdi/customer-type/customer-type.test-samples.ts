import { ICustomerType, NewCustomerType } from './customer-type.model';

export const sampleWithRequiredData: ICustomerType = {
  id: 13666,
};

export const sampleWithPartialData: ICustomerType = {
  id: 16979,
  customerTypeCode: 'Soft Clothing Practical',
  customerTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICustomerType = {
  id: 55515,
  customerTypeCode: 'Directives',
  customerType: 'Licensed',
  customerTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCustomerType = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
