import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

import { ILoanRestructureFlag, NewLoanRestructureFlag } from './loan-restructure-flag.model';

export const sampleWithRequiredData: ILoanRestructureFlag = {
  id: 8466,
  loanRestructureFlagCode: FlagCodes['Y'],
  loanRestructureFlagType: 'Ergonomic Handcrafted',
};

export const sampleWithPartialData: ILoanRestructureFlag = {
  id: 63107,
  loanRestructureFlagCode: FlagCodes['Y'],
  loanRestructureFlagType: 'deposit Data Realigned',
  loanRestructureFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanRestructureFlag = {
  id: 36917,
  loanRestructureFlagCode: FlagCodes['Y'],
  loanRestructureFlagType: 'Applications',
  loanRestructureFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanRestructureFlag = {
  loanRestructureFlagCode: FlagCodes['N'],
  loanRestructureFlagType: 'Brand',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
