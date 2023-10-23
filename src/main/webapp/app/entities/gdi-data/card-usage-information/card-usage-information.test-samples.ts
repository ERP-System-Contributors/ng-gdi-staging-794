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

import { ICardUsageInformation, NewCardUsageInformation } from './card-usage-information.model';

export const sampleWithRequiredData: ICardUsageInformation = {
  id: 16277,
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfLiveCards: 40184,
  totalActiveCards: 92762,
  totalNumberOfTransactionsDone: 62007,
  totalValueOfTransactionsDoneInLCY: 97311,
};

export const sampleWithPartialData: ICardUsageInformation = {
  id: 36146,
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfLiveCards: 70771,
  totalActiveCards: 17421,
  totalNumberOfTransactionsDone: 86703,
  totalValueOfTransactionsDoneInLCY: 34317,
};

export const sampleWithFullData: ICardUsageInformation = {
  id: 26168,
  reportingDate: dayjs('2023-10-03'),
  totalNumberOfLiveCards: 19388,
  totalActiveCards: 41383,
  totalNumberOfTransactionsDone: 67465,
  totalValueOfTransactionsDoneInLCY: 14823,
};

export const sampleWithNewData: NewCardUsageInformation = {
  reportingDate: dayjs('2023-10-04'),
  totalNumberOfLiveCards: 57907,
  totalActiveCards: 28938,
  totalNumberOfTransactionsDone: 31341,
  totalValueOfTransactionsDoneInLCY: 93289,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
