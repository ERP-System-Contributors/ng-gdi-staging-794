import { ILoanPerformanceClassification, NewLoanPerformanceClassification } from './loan-performance-classification.model';

export const sampleWithRequiredData: ILoanPerformanceClassification = {
  id: 37270,
  loanPerformanceClassificationCode: 'Buckinghamshire infomediaries Unit',
  loanPerformanceClassificationType: 'Glens',
};

export const sampleWithPartialData: ILoanPerformanceClassification = {
  id: 63303,
  loanPerformanceClassificationCode: 'violet',
  loanPerformanceClassificationType: 'channels next-generation cross-platform',
  microfinanceDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanPerformanceClassification = {
  id: 76467,
  loanPerformanceClassificationCode: 'SQL',
  loanPerformanceClassificationType: 'deposit',
  commercialBankDescription: '../fake-data/blob/hipster.txt',
  microfinanceDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanPerformanceClassification = {
  loanPerformanceClassificationCode: 'system',
  loanPerformanceClassificationType: 'state',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
