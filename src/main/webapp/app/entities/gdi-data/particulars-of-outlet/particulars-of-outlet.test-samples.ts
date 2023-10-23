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

import { IParticularsOfOutlet, NewParticularsOfOutlet } from './particulars-of-outlet.model';

export const sampleWithRequiredData: IParticularsOfOutlet = {
  id: 28064,
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Key',
  town: 'paradigm seamless Incredible',
  iso6709Latitute: 7308,
  iso6709Longitude: 18308,
  cbkApprovalDate: dayjs('2023-10-04'),
  outletOpeningDate: dayjs('2023-10-04'),
  licenseFeePayable: 35853,
};

export const sampleWithPartialData: IParticularsOfOutlet = {
  id: 92185,
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Horizontal unleash matrix',
  town: 'Steel green',
  iso6709Latitute: 89867,
  iso6709Longitude: 77606,
  cbkApprovalDate: dayjs('2023-10-03'),
  outletOpeningDate: dayjs('2023-10-03'),
  outletClosureDate: dayjs('2023-10-04'),
  licenseFeePayable: 23970,
};

export const sampleWithFullData: IParticularsOfOutlet = {
  id: 94069,
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Executive',
  town: 'synergistic bypassing Ruble',
  iso6709Latitute: 75607,
  iso6709Longitude: 2046,
  cbkApprovalDate: dayjs('2023-10-03'),
  outletOpeningDate: dayjs('2023-10-03'),
  outletClosureDate: dayjs('2023-10-03'),
  licenseFeePayable: 90229,
};

export const sampleWithNewData: NewParticularsOfOutlet = {
  businessReportingDate: dayjs('2023-10-03'),
  outletName: 'Tools',
  town: 'Texas',
  iso6709Latitute: 81721,
  iso6709Longitude: 32695,
  cbkApprovalDate: dayjs('2023-10-03'),
  outletOpeningDate: dayjs('2023-10-03'),
  licenseFeePayable: 20345,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
