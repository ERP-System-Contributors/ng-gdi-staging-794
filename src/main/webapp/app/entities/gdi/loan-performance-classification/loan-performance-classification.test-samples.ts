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

import { ILoanPerformanceClassification, NewLoanPerformanceClassification } from './loan-performance-classification.model';

export const sampleWithRequiredData: ILoanPerformanceClassification = {
  id: 37270,
  loanPerformanceClassificationCode: 'Buckinghamshire infomediaries Unit',
  loanPerformanceClassificationType: 'Glens',
};

export const sampleWithPartialData: ILoanPerformanceClassification = {
  id: 63303,
  loanPerformanceClassificationCode: 'violet',
  loanPerformanceClassificationType: 'channels next-generation cross-platform',
  microfinanceDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanPerformanceClassification = {
  id: 76467,
  loanPerformanceClassificationCode: 'SQL',
  loanPerformanceClassificationType: 'deposit',
  commercialBankDescription: '../fake-data/blob/hipster.txt',
  microfinanceDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanPerformanceClassification = {
  loanPerformanceClassificationCode: 'system',
  loanPerformanceClassificationType: 'state',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
