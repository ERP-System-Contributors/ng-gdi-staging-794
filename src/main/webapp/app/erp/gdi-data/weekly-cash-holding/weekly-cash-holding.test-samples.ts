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

import { IWeeklyCashHolding, NewWeeklyCashHolding } from './weekly-cash-holding.model';

export const sampleWithRequiredData: IWeeklyCashHolding = {
  id: 84355,
  reportingDate: dayjs('2023-10-03'),
  fitUnits: 84566,
  unfitUnits: 19981,
};

export const sampleWithPartialData: IWeeklyCashHolding = {
  id: 59150,
  reportingDate: dayjs('2023-10-03'),
  fitUnits: 19318,
  unfitUnits: 87588,
};

export const sampleWithFullData: IWeeklyCashHolding = {
  id: 84063,
  reportingDate: dayjs('2023-10-03'),
  fitUnits: 43086,
  unfitUnits: 92956,
};

export const sampleWithNewData: NewWeeklyCashHolding = {
  reportingDate: dayjs('2023-10-04'),
  fitUnits: 22303,
  unfitUnits: 85332,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
