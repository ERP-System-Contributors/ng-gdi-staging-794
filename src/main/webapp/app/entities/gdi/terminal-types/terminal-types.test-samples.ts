import { ITerminalTypes, NewTerminalTypes } from './terminal-types.model';

export const sampleWithRequiredData: ITerminalTypes = {
  id: 3330,
  txnTerminalTypeCode: 'Auto Fresh',
  txnChannelType: 'Unbranded Small Computers',
};

export const sampleWithPartialData: ITerminalTypes = {
  id: 20171,
  txnTerminalTypeCode: 'homogeneous',
  txnChannelType: 'Optimization challenge solutions',
  txnChannelTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ITerminalTypes = {
  id: 81171,
  txnTerminalTypeCode: 'parallelism',
  txnChannelType: 'compressing generating Agent',
  txnChannelTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewTerminalTypes = {
  txnTerminalTypeCode: 'Health',
  txnChannelType: 'Grass-roots',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
