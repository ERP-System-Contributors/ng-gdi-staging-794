import { ILoanDeclineReason, NewLoanDeclineReason } from './loan-decline-reason.model';

export const sampleWithRequiredData: ILoanDeclineReason = {
  id: 29784,
  loanDeclineReasonTypeCode: 'Rapid navigating',
  loanDeclineReasonType: 'Investment',
};

export const sampleWithPartialData: ILoanDeclineReason = {
  id: 68335,
  loanDeclineReasonTypeCode: 'index',
  loanDeclineReasonType: 'feed Finland Ports',
};

export const sampleWithFullData: ILoanDeclineReason = {
  id: 74861,
  loanDeclineReasonTypeCode: 'technologies Chicken',
  loanDeclineReasonType: 'Orchestrator',
  loanDeclineReasonDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanDeclineReason = {
  loanDeclineReasonTypeCode: 'bluetooth',
  loanDeclineReasonType: 'collaboration moderator haptic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
