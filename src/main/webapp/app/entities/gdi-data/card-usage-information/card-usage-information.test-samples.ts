import dayjs from 'dayjs/esm';

import { ICardUsageInformation, NewCardUsageInformation } from './card-usage-information.model';

export const sampleWithRequiredData: ICardUsageInformation = {
  id: 16277,
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfLiveCards: 40184,
  totalActiveCards: 92762,
  totalNumberOfTransactionsDone: 62007,
  totalValueOfTransactionsDoneInLCY: 97311,
};

export const sampleWithPartialData: ICardUsageInformation = {
  id: 36146,
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfLiveCards: 70771,
  totalActiveCards: 17421,
  totalNumberOfTransactionsDone: 86703,
  totalValueOfTransactionsDoneInLCY: 34317,
};

export const sampleWithFullData: ICardUsageInformation = {
  id: 26168,
  reportingDate: dayjs('2023-10-03'),
  totalNumberOfLiveCards: 19388,
  totalActiveCards: 41383,
  totalNumberOfTransactionsDone: 67465,
  totalValueOfTransactionsDoneInLCY: 14823,
};

export const sampleWithNewData: NewCardUsageInformation = {
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfLiveCards: 57907,
  totalActiveCards: 28938,
  totalNumberOfTransactionsDone: 31341,
  totalValueOfTransactionsDoneInLCY: 93289,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
