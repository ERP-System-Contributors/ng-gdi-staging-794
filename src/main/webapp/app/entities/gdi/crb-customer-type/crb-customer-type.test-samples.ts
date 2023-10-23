import { ICrbCustomerType, NewCrbCustomerType } from './crb-customer-type.model';

export const sampleWithRequiredData: ICrbCustomerType = {
  id: 7710,
  customerTypeCode: 'Table Portugal',
  customerType: 'fault-tolerant invoice',
};

export const sampleWithPartialData: ICrbCustomerType = {
  id: 68639,
  customerTypeCode: 'Exclusive Radial Auto',
  customerType: 'customized Officer primary',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbCustomerType = {
  id: 5320,
  customerTypeCode: 'vertical Tactics paradigms',
  customerType: 'Bedfordshire',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbCustomerType = {
  customerTypeCode: 'evolve Synergized',
  customerType: 'EXE Nebraska Credit',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
