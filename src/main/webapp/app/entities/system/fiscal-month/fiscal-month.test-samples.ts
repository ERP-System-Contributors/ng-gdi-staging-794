import dayjs from 'dayjs/esm';

import { IFiscalMonth, NewFiscalMonth } from './fiscal-month.model';

export const sampleWithRequiredData: IFiscalMonth = {
  id: 53186,
  monthNumber: 33596,
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-16'),
  fiscalMonthCode: 'De-engineered bluetooth panel',
};

export const sampleWithPartialData: IFiscalMonth = {
  id: 14348,
  monthNumber: 51498,
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-15'),
  fiscalMonthCode: 'Fresh gold payment',
};

export const sampleWithFullData: IFiscalMonth = {
  id: 62173,
  monthNumber: 38973,
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-16'),
  fiscalMonthCode: 'back-end',
};

export const sampleWithNewData: NewFiscalMonth = {
  monthNumber: 90298,
  startDate: dayjs('2023-08-16'),
  endDate: dayjs('2023-08-15'),
  fiscalMonthCode: 'compelling innovate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
