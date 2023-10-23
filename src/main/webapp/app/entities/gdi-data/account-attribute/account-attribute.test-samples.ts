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

import { IAccountAttribute, NewAccountAttribute } from './account-attribute.model';

export const sampleWithRequiredData: IAccountAttribute = {
  id: 5188,
  reportingDate: dayjs('2023-10-02'),
  customerNumber: 'generating Kids interactive',
  accountContractNumber: 'experiences Human Taka',
  accountName: 'Home Loan Account',
  debitInterestRate: 59824,
  creditInterestRate: 23813,
  sanctionedAccountLimitFcy: 78840,
  sanctionedAccountLimitLcy: 85879,
};

export const sampleWithPartialData: IAccountAttribute = {
  id: 26176,
  reportingDate: dayjs('2023-10-02'),
  customerNumber: 'experiences',
  accountContractNumber: 'Gabon Island',
  accountName: 'Auto Loan Account',
  accountClosingDate: dayjs('2023-10-03'),
  debitInterestRate: 61168,
  creditInterestRate: 87036,
  sanctionedAccountLimitFcy: 1740,
  sanctionedAccountLimitLcy: 55305,
  accountStatusChangeDate: dayjs('2023-10-03'),
};

export const sampleWithFullData: IAccountAttribute = {
  id: 56465,
  reportingDate: dayjs('2023-10-02'),
  customerNumber: 'Mobility revolutionize Officer',
  accountContractNumber: 'fuchsia virtual',
  accountName: 'Investment Account',
  accountOpeningDate: dayjs('2023-10-02'),
  accountClosingDate: dayjs('2023-10-02'),
  debitInterestRate: 94395,
  creditInterestRate: 76147,
  sanctionedAccountLimitFcy: 98194,
  sanctionedAccountLimitLcy: 41859,
  accountStatusChangeDate: dayjs('2023-10-03'),
  expiryDate: dayjs('2023-10-02'),
};

export const sampleWithNewData: NewAccountAttribute = {
  reportingDate: dayjs('2023-10-02'),
  customerNumber: 'Automotive Account',
  accountContractNumber: 'Home Assistant',
  accountName: 'Checking Account',
  debitInterestRate: 32057,
  creditInterestRate: 71252,
  sanctionedAccountLimitFcy: 323,
  sanctionedAccountLimitLcy: 24129,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
