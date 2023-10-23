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

import { IFxTransactionType, NewFxTransactionType } from './fx-transaction-type.model';

export const sampleWithRequiredData: IFxTransactionType = {
  id: 78060,
  fxTransactionTypeCode: 'engage matrices Wooden',
  fxTransactionType: 'THX',
};

export const sampleWithPartialData: IFxTransactionType = {
  id: 46678,
  fxTransactionTypeCode: 'green',
  fxTransactionType: 'withdrawal',
  fxTransactionTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFxTransactionType = {
  id: 50204,
  fxTransactionTypeCode: 'deposit ivory azure',
  fxTransactionType: 'back-end withdrawal networks',
  fxTransactionTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFxTransactionType = {
  fxTransactionTypeCode: 'Rupee back-end',
  fxTransactionType: 'hack transmitter',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
