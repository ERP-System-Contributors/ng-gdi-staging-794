import dayjs from 'dayjs/esm';

import { FiscalYearStatusType } from 'app/entities/enumerations/fiscal-year-status-type.model';

import { IFiscalYear, NewFiscalYear } from './fiscal-year.model';

export const sampleWithRequiredData: IFiscalYear = {
  id: 26293,
  fiscalYearCode: 'online Account connect',
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-16'),
};

export const sampleWithPartialData: IFiscalYear = {
  id: 62236,
  fiscalYearCode: 'blue Virginia',
  startDate: dayjs('2023-08-16'),
  endDate: dayjs('2023-08-15'),
  fiscalYearStatus: FiscalYearStatusType['IN_PROGRESS'],
};

export const sampleWithFullData: IFiscalYear = {
  id: 41401,
  fiscalYearCode: 'Indiana Bedfordshire',
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-16'),
  fiscalYearStatus: FiscalYearStatusType['OPEN'],
};

export const sampleWithNewData: NewFiscalYear = {
  fiscalYearCode: 'metrics Upgradable',
  startDate: dayjs('2023-08-15'),
  endDate: dayjs('2023-08-15'),
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
