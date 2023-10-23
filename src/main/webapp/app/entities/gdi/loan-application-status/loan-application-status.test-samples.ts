import { ILoanApplicationStatus, NewLoanApplicationStatus } from './loan-application-status.model';

export const sampleWithRequiredData: ILoanApplicationStatus = {
  id: 90209,
  loanApplicationStatusTypeCode: 'Licensed California',
  loanApplicationStatusType: 'Sausages',
};

export const sampleWithPartialData: ILoanApplicationStatus = {
  id: 27156,
  loanApplicationStatusTypeCode: 'Peso leverage',
  loanApplicationStatusType: 'Dynamic Computers Meadow',
  loanApplicationStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanApplicationStatus = {
  id: 83116,
  loanApplicationStatusTypeCode: 'JSON',
  loanApplicationStatusType: 'compressing deposit',
  loanApplicationStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanApplicationStatus = {
  loanApplicationStatusTypeCode: 'Electronics',
  loanApplicationStatusType: 'XML',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
