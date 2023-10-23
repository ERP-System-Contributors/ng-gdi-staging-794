import { LoanAccountMutationTypes } from 'app/entities/enumerations/loan-account-mutation-types.model';

import { ILoanAccountCategory, NewLoanAccountCategory } from './loan-account-category.model';

export const sampleWithRequiredData: ILoanAccountCategory = {
  id: 12352,
  loanAccountMutationCode: 'Awesome Views Incredible',
  loanAccountMutationType: LoanAccountMutationTypes['RESTRUCTURED'],
  loanAccountMutationDetails: 'Home Keyboard',
};

export const sampleWithPartialData: ILoanAccountCategory = {
  id: 83252,
  loanAccountMutationCode: 'wireless Borders',
  loanAccountMutationType: LoanAccountMutationTypes['WRITTEN_OFF'],
  loanAccountMutationDetails: 'payment Enhanced services',
  loanAccountMutationDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanAccountCategory = {
  id: 91538,
  loanAccountMutationCode: 'input',
  loanAccountMutationType: LoanAccountMutationTypes['WRITTEN_OFF'],
  loanAccountMutationDetails: 'Account Nebraska payment',
  loanAccountMutationDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanAccountCategory = {
  loanAccountMutationCode: 'SSL Granite Maryland',
  loanAccountMutationType: LoanAccountMutationTypes['WRITTEN_OFF'],
  loanAccountMutationDetails: 'Marketing Granite driver',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
