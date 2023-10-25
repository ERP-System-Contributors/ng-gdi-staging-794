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

import { IDerivativeSubType, NewDerivativeSubType } from './derivative-sub-type.model';

export const sampleWithRequiredData: IDerivativeSubType = {
  id: 97007,
  financialDerivativeSubTypeCode: 'Romania',
  financialDerivativeSubTye: 'testing Account Chicken',
};

export const sampleWithPartialData: IDerivativeSubType = {
  id: 62889,
  financialDerivativeSubTypeCode: 'knowledge transmitter',
  financialDerivativeSubTye: 'Metal',
  financialDerivativeSubtypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDerivativeSubType = {
  id: 48955,
  financialDerivativeSubTypeCode: 'payment Functionality',
  financialDerivativeSubTye: 'Salvador Designer Handmade',
  financialDerivativeSubtypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDerivativeSubType = {
  financialDerivativeSubTypeCode: 'Estonia',
  financialDerivativeSubTye: 'index synthesizing leverage',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
