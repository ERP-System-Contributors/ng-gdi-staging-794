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

import { ILoanRepaymentFrequency, NewLoanRepaymentFrequency } from './loan-repayment-frequency.model';

export const sampleWithRequiredData: ILoanRepaymentFrequency = {
  id: 48250,
  frequencyTypeCode: 'gold',
  frequencyType: 'hybrid compress',
};

export const sampleWithPartialData: ILoanRepaymentFrequency = {
  id: 74186,
  frequencyTypeCode: 'Centers Union client-driven',
  frequencyType: 'copying hard cross-platform',
  frequencyTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanRepaymentFrequency = {
  id: 9251,
  frequencyTypeCode: 'Missouri',
  frequencyType: 'Nebraska Dollar Automotive',
  frequencyTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanRepaymentFrequency = {
  frequencyTypeCode: 'Corporate',
  frequencyType: 'Wooden',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
