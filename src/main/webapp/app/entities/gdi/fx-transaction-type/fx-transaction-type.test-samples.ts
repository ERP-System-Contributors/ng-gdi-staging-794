import { IFxTransactionType, NewFxTransactionType } from './fx-transaction-type.model';

export const sampleWithRequiredData: IFxTransactionType = {
  id: 78060,
  fxTransactionTypeCode: 'engage matrices Wooden',
  fxTransactionType: 'THX',
};

export const sampleWithPartialData: IFxTransactionType = {
  id: 46678,
  fxTransactionTypeCode: 'green',
  fxTransactionType: 'withdrawal',
  fxTransactionTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFxTransactionType = {
  id: 50204,
  fxTransactionTypeCode: 'deposit ivory azure',
  fxTransactionType: 'back-end withdrawal networks',
  fxTransactionTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFxTransactionType = {
  fxTransactionTypeCode: 'Rupee back-end',
  fxTransactionType: 'hack transmitter',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
