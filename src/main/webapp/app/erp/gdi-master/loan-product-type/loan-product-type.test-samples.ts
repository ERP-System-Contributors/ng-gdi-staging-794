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

import { ILoanProductType, NewLoanProductType } from './loan-product-type.model';

export const sampleWithRequiredData: ILoanProductType = {
  id: 74955,
  productCode: 'payment Groves Corporate',
  productType: 'Innovative parse',
};

export const sampleWithPartialData: ILoanProductType = {
  id: 65465,
  productCode: 'IB Proactive Vanuatu',
  productType: 'interface deliverables',
  productTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanProductType = {
  id: 25029,
  productCode: 'Customer Czech Kids',
  productType: 'Planner Concrete',
  productTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanProductType = {
  productCode: 'Electronics',
  productType: 'magnetic program Tools',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
