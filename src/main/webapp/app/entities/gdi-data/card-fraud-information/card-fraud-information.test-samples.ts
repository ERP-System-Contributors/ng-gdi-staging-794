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
