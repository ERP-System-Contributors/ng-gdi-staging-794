import { ILoanApplicationType, NewLoanApplicationType } from './loan-application-type.model';

export const sampleWithRequiredData: ILoanApplicationType = {
  id: 29355,
  loanApplicationTypeCode: 'indexing benchmark',
  loanApplicationType: 'SCSI virtual',
};

export const sampleWithPartialData: ILoanApplicationType = {
  id: 74412,
  loanApplicationTypeCode: 'Fantastic Kids',
  loanApplicationType: 'Dam RSS',
  loanApplicationDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanApplicationType = {
  id: 93623,
  loanApplicationTypeCode: 'Shoes',
  loanApplicationType: 'facilitate compress',
  loanApplicationDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanApplicationType = {
  loanApplicationTypeCode: 'deposit multi-byte',
  loanApplicationType: 'Electronics Credit withdrawal',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
