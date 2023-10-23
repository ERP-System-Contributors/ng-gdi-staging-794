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

import { IInterestCalcMethod, NewInterestCalcMethod } from './interest-calc-method.model';

export const sampleWithRequiredData: IInterestCalcMethod = {
  id: 55981,
  interestCalculationMethodCode: 'XSS best-of-breed',
  interestCalculationMthodType: 'Roads',
};

export const sampleWithPartialData: IInterestCalcMethod = {
  id: 56386,
  interestCalculationMethodCode: 'Computers User-friendly',
  interestCalculationMthodType: 'Dakota',
};

export const sampleWithFullData: IInterestCalcMethod = {
  id: 78027,
  interestCalculationMethodCode: 'AGP Program',
  interestCalculationMthodType: 'interface',
  interestCalculationMethodDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewInterestCalcMethod = {
  interestCalculationMethodCode: 'Pound',
  interestCalculationMthodType: 'PCI Handcrafted card',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
