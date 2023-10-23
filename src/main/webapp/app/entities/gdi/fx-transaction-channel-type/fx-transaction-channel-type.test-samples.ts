import { IFxTransactionChannelType, NewFxTransactionChannelType } from './fx-transaction-channel-type.model';

export const sampleWithRequiredData: IFxTransactionChannelType = {
  id: 46736,
  fxTransactionChannelCode: 'end-to-end',
  fxTransactionChannelType: 'Salvador',
};

export const sampleWithPartialData: IFxTransactionChannelType = {
  id: 18823,
  fxTransactionChannelCode: 'Overpass',
  fxTransactionChannelType: 'District',
};

export const sampleWithFullData: IFxTransactionChannelType = {
  id: 61441,
  fxTransactionChannelCode: 'wireless',
  fxTransactionChannelType: 'Concrete',
  fxChannelTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFxTransactionChannelType = {
  fxTransactionChannelCode: 'Fresh transmitting',
  fxTransactionChannelType: 'Keyboard XML',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
