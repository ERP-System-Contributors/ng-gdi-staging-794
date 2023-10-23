///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
