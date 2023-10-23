import dayjs from 'dayjs/esm';

import { ICardFraudInformation, NewCardFraudInformation } from './card-fraud-information.model';

export const sampleWithRequiredData: ICardFraudInformation = {
  id: 72525,
  reportingDate: dayjs('2023-10-03'),
  totalNumberOfFraudIncidents: 32143,
  valueOfFraudIncedentsInLCY: 2073,
};

export const sampleWithPartialData: ICardFraudInformation = {
  id: 95891,
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfFraudIncidents: 98966,
  valueOfFraudIncedentsInLCY: 40663,
};

export const sampleWithFullData: ICardFraudInformation = {
  id: 92544,
  reportingDate: dayjs('2023-10-03'),
  totalNumberOfFraudIncidents: 62084,
  valueOfFraudIncedentsInLCY: 58956,
};

export const sampleWithNewData: NewCardFraudInformation = {
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfFraudIncidents: 82371,
  valueOfFraudIncedentsInLCY: 26456,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
