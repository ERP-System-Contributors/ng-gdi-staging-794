import dayjs from 'dayjs/esm';

import { IFiscalQuarter, NewFiscalQuarter } from './fiscal-quarter.model';

export const sampleWithRequiredData: IFiscalQuarter = {
  id: 63397,
  quarterNumber: 64719,
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-15'),
  fiscalQuarterCode: 'grey TCP Engineer',
};

export const sampleWithPartialData: IFiscalQuarter = {
  id: 43127,
  quarterNumber: 46083,
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-15'),
  fiscalQuarterCode: 'Progressive withdrawal Pants',
};

export const sampleWithFullData: IFiscalQuarter = {
  id: 17202,
  quarterNumber: 67528,
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-15'),
  fiscalQuarterCode: 'Direct capacitor Music',
};

export const sampleWithNewData: NewFiscalQuarter = {
  quarterNumber: 19286,
  startDate: dayjs('2023-08-16'),
  endDate: dayjs('2023-08-16'),
  fiscalQuarterCode: 'Movies Expanded California',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
