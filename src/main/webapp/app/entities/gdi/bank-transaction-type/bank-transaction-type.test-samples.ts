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

import { IBankTransactionType, NewBankTransactionType } from './bank-transaction-type.model';

export const sampleWithRequiredData: IBankTransactionType = {
  id: 57773,
  transactionTypeCode: 'Forward Shirt',
  transactionTypeDetails: 'Persevering Nepal Manager',
};

export const sampleWithPartialData: IBankTransactionType = {
  id: 84599,
  transactionTypeCode: 'Group Mississippi Czech',
  transactionTypeDetails: 'Director Shilling card',
};

export const sampleWithFullData: IBankTransactionType = {
  id: 83746,
  transactionTypeCode: 'Practical e-commerce RAM',
  transactionTypeDetails: 'implement Shirt',
};

export const sampleWithNewData: NewBankTransactionType = {
  transactionTypeCode: 'Sterling',
  transactionTypeDetails: 'Response cutting-edge Route',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
