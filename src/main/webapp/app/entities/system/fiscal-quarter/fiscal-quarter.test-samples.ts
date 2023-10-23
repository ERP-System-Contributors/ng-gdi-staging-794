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
