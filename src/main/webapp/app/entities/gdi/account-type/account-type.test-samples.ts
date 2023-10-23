import { IAccountType, NewAccountType } from './account-type.model';

export const sampleWithRequiredData: IAccountType = {
  id: 52608,
  accountTypeCode: 'deposit Hat Wooden',
};

export const sampleWithPartialData: IAccountType = {
  id: 11418,
  accountTypeCode: 'synergies whiteboard Games',
  accountType: 'bluetooth',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IAccountType = {
  id: 93027,
  accountTypeCode: 'Netherlands Computer monetize',
  accountType: 'secondary Gambia',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAccountType = {
  accountTypeCode: 'Borders intelligence Borders',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
