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

import { ICardAcquiringTransaction, NewCardAcquiringTransaction } from './card-acquiring-transaction.model';

export const sampleWithRequiredData: ICardAcquiringTransaction = {
  id: 59297,
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'Roads XML Nepal',
  numberOfTransactions: 36585,
  valueOfTransactionsInLCY: 49662,
};

export const sampleWithPartialData: ICardAcquiringTransaction = {
  id: 14316,
  reportingDate: dayjs('2023-10-04'),
  terminalId: 'Arizona internet Sleek',
  numberOfTransactions: 22819,
  valueOfTransactionsInLCY: 75381,
};

export const sampleWithFullData: ICardAcquiringTransaction = {
  id: 40998,
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'West microchip',
  numberOfTransactions: 11238,
  valueOfTransactionsInLCY: 20499,
};

export const sampleWithNewData: NewCardAcquiringTransaction = {
  reportingDate: dayjs('2023-10-03'),
  terminalId: 'Grocery Program',
  numberOfTransactions: 70051,
  valueOfTransactionsInLCY: 19122,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
