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
