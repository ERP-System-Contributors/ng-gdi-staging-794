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

import { IPerformanceOfForeignSubsidiaries, NewPerformanceOfForeignSubsidiaries } from './performance-of-foreign-subsidiaries.model';

export const sampleWithRequiredData: IPerformanceOfForeignSubsidiaries = {
  id: 89566,
  subsidiaryName: 'Tasty navigating Division',
  reportingDate: dayjs('2023-10-03'),
  subsidiaryId: 'driver bricks-and-clicks indigo',
  grossLoansAmount: 28962,
  grossNPALoanAmount: 14645,
  grossAssetsAmount: 5530,
  grossDepositsAmount: 32666,
  profitBeforeTax: 76731,
  totalCapitalAdequacyRatio: 65075,
  liquidityRatio: 62259,
  generalProvisions: 81071,
  specificProvisions: 58851,
  interestInSuspenseAmount: 14930,
  totalNumberOfStaff: 19248,
  numberOfBranches: 61752,
};

export const sampleWithPartialData: IPerformanceOfForeignSubsidiaries = {
  id: 30113,
  subsidiaryName: 'bus Brand compress',
  reportingDate: dayjs('2023-10-04'),
  subsidiaryId: 'Bedfordshire',
  grossLoansAmount: 85232,
  grossNPALoanAmount: 52372,
  grossAssetsAmount: 17156,
  grossDepositsAmount: 36835,
  profitBeforeTax: 94370,
  totalCapitalAdequacyRatio: 87504,
  liquidityRatio: 24709,
  generalProvisions: 83967,
  specificProvisions: 97017,
  interestInSuspenseAmount: 28082,
  totalNumberOfStaff: 98359,
  numberOfBranches: 25310,
};

export const sampleWithFullData: IPerformanceOfForeignSubsidiaries = {
  id: 63359,
  subsidiaryName: 'AGP productize Fresh',
  reportingDate: dayjs('2023-10-03'),
  subsidiaryId: 'invoice connecting',
  grossLoansAmount: 21602,
  grossNPALoanAmount: 86607,
  grossAssetsAmount: 75321,
  grossDepositsAmount: 26600,
  profitBeforeTax: 50126,
  totalCapitalAdequacyRatio: 3237,
  liquidityRatio: 79892,
  generalProvisions: 65959,
  specificProvisions: 89427,
  interestInSuspenseAmount: 54157,
  totalNumberOfStaff: 99955,
  numberOfBranches: 62075,
};

export const sampleWithNewData: NewPerformanceOfForeignSubsidiaries = {
  subsidiaryName: 'systems',
  reportingDate: dayjs('2023-10-03'),
  subsidiaryId: 'SSL Assimilated Light',
  grossLoansAmount: 39945,
  grossNPALoanAmount: 363,
  grossAssetsAmount: 72701,
  grossDepositsAmount: 94095,
  profitBeforeTax: 54842,
  totalCapitalAdequacyRatio: 38529,
  liquidityRatio: 33291,
  generalProvisions: 46157,
  specificProvisions: 14290,
  interestInSuspenseAmount: 93754,
  totalNumberOfStaff: 86609,
  numberOfBranches: 22739,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
