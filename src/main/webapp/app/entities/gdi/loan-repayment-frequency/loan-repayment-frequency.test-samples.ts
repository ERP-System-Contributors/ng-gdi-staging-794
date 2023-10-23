import { ILoanRepaymentFrequency, NewLoanRepaymentFrequency } from './loan-repayment-frequency.model';

export const sampleWithRequiredData: ILoanRepaymentFrequency = {
  id: 48250,
  frequencyTypeCode: 'gold',
  frequencyType: 'hybrid compress',
};

export const sampleWithPartialData: ILoanRepaymentFrequency = {
  id: 74186,
  frequencyTypeCode: 'Centers Union client-driven',
  frequencyType: 'copying hard cross-platform',
  frequencyTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanRepaymentFrequency = {
  id: 9251,
  frequencyTypeCode: 'Missouri',
  frequencyType: 'Nebraska Dollar Automotive',
  frequencyTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanRepaymentFrequency = {
  frequencyTypeCode: 'Corporate',
  frequencyType: 'Wooden',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
