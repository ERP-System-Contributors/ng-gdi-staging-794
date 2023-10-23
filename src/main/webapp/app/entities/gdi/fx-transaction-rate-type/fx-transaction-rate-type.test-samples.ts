import { IFxTransactionRateType, NewFxTransactionRateType } from './fx-transaction-rate-type.model';

export const sampleWithRequiredData: IFxTransactionRateType = {
  id: 80295,
  fxTransactionRateTypeCode: 'Tuna Wisconsin',
  fxTransactionRateType: 'mobile Liaison',
};

export const sampleWithPartialData: IFxTransactionRateType = {
  id: 56655,
  fxTransactionRateTypeCode: 'copying',
  fxTransactionRateType: 'Account Music',
  fxTransactionRateTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFxTransactionRateType = {
  id: 14972,
  fxTransactionRateTypeCode: 'Avon innovate',
  fxTransactionRateType: 'Legacy',
  fxTransactionRateTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFxTransactionRateType = {
  fxTransactionRateTypeCode: 'synthesize users',
  fxTransactionRateType: 'Total',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
