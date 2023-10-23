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

import { IFinancialDerivativeTypeCode, NewFinancialDerivativeTypeCode } from './financial-derivative-type-code.model';

export const sampleWithRequiredData: IFinancialDerivativeTypeCode = {
  id: 92235,
  financialDerivativeTypeCode: 'Bike connecting bluetooth',
  financialDerivativeType: 'panel Product',
};

export const sampleWithPartialData: IFinancialDerivativeTypeCode = {
  id: 35482,
  financialDerivativeTypeCode: 'generating Marketing',
  financialDerivativeType: 'Buckinghamshire',
  financialDerivativeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFinancialDerivativeTypeCode = {
  id: 46430,
  financialDerivativeTypeCode: 'Neck Metal',
  financialDerivativeType: 'grid-enabled user-facing',
  financialDerivativeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFinancialDerivativeTypeCode = {
  financialDerivativeTypeCode: 'Forint B2C payment',
  financialDerivativeType: 'input',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
