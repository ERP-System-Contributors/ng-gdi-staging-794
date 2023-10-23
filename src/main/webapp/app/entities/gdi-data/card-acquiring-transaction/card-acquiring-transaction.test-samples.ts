import dayjs from 'dayjs/esm';

import { ICardAcquiringTransaction, NewCardAcquiringTransaction } from './card-acquiring-transaction.model';

export const sampleWithRequiredData: ICardAcquiringTransaction = {
  id: 59297,
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'Roads XML Nepal',
  numberOfTransactions: 36585,
  valueOfTransactionsInLCY: 49662,
};

export const sampleWithPartialData: ICardAcquiringTransaction = {
  id: 14316,
  reportingDate: dayjs('2023-10-04'),
  terminalId: 'Arizona internet Sleek',
  numberOfTransactions: 22819,
  valueOfTransactionsInLCY: 75381,
};

export const sampleWithFullData: ICardAcquiringTransaction = {
  id: 40998,
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'West microchip',
  numberOfTransactions: 11238,
  valueOfTransactionsInLCY: 20499,
};

export const sampleWithNewData: NewCardAcquiringTransaction = {
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'Grocery Program',
  numberOfTransactions: 70051,
  valueOfTransactionsInLCY: 19122,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
