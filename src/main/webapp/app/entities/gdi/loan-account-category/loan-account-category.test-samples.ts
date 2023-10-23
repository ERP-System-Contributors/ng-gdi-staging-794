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

import { LoanAccountMutationTypes } from 'app/entities/enumerations/loan-account-mutation-types.model';

import { ILoanAccountCategory, NewLoanAccountCategory } from './loan-account-category.model';

export const sampleWithRequiredData: ILoanAccountCategory = {
  id: 12352,
  loanAccountMutationCode: 'Awesome Views Incredible',
  loanAccountMutationType: LoanAccountMutationTypes['RESTRUCTURED'],
  loanAccountMutationDetails: 'Home Keyboard',
};

export const sampleWithPartialData: ILoanAccountCategory = {
  id: 83252,
  loanAccountMutationCode: 'wireless Borders',
  loanAccountMutationType: LoanAccountMutationTypes['WRITTEN_OFF'],
  loanAccountMutationDetails: 'payment Enhanced services',
  loanAccountMutationDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanAccountCategory = {
  id: 91538,
  loanAccountMutationCode: 'input',
  loanAccountMutationType: LoanAccountMutationTypes['WRITTEN_OFF'],
  loanAccountMutationDetails: 'Account Nebraska payment',
  loanAccountMutationDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanAccountCategory = {
  loanAccountMutationCode: 'SSL Granite Maryland',
  loanAccountMutationType: LoanAccountMutationTypes['WRITTEN_OFF'],
  loanAccountMutationDetails: 'Marketing Granite driver',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
