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

import { IAccountBalance, NewAccountBalance } from './account-balance.model';

export const sampleWithRequiredData: IAccountBalance = {
  id: 98342,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Berkshire',
  accountContractNumber: '842488693583295',
  accruedInterestBalanceFCY: 63789,
  accruedInterestBalanceLCY: 66522,
  accountBalanceFCY: 25345,
  accountBalanceLCY: 87579,
};

export const sampleWithPartialData: IAccountBalance = {
  id: 35016,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Solutions payment extend',
  accountContractNumber: '344780150939877',
  accruedInterestBalanceFCY: 58148,
  accruedInterestBalanceLCY: 64063,
  accountBalanceFCY: 53322,
  accountBalanceLCY: 13992,
};

export const sampleWithFullData: IAccountBalance = {
  id: 44702,
  reportingDate: dayjs('2023-10-04'),
  customerId: 'support invoice integrate',
  accountContractNumber: '896343278260595',
  accruedInterestBalanceFCY: 97183,
  accruedInterestBalanceLCY: 67561,
  accountBalanceFCY: 40335,
  accountBalanceLCY: 84140,
};

export const sampleWithNewData: NewAccountBalance = {
  reportingDate: dayjs('2023-10-04'),
  customerId: 'convergence Cameroon Village',
  accountContractNumber: '918342377395805',
  accruedInterestBalanceFCY: 97477,
  accruedInterestBalanceLCY: 6982,
  accountBalanceFCY: 43158,
  accountBalanceLCY: 41937,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
