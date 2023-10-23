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

import { ICountySubCountyCode, NewCountySubCountyCode } from './county-sub-county-code.model';

export const sampleWithRequiredData: ICountySubCountyCode = {
  id: 24525,
  subCountyCode: '1616',
  subCountyName: 'National synthesizing well-modulated',
  countyCode: '20',
  countyName: 'core',
};

export const sampleWithPartialData: ICountySubCountyCode = {
  id: 36934,
  subCountyCode: '4256',
  subCountyName: 'calculating seize',
  countyCode: '38',
  countyName: 'Robust e-business e-business',
};

export const sampleWithFullData: ICountySubCountyCode = {
  id: 55370,
  subCountyCode: '7890',
  subCountyName: 'generate',
  countyCode: '71',
  countyName: 'Causeway',
};

export const sampleWithNewData: NewCountySubCountyCode = {
  subCountyCode: '6976',
  subCountyName: 'Bike aggregate Nebraska',
  countyCode: '65',
  countyName: 'Cross-platform deposit Rubber',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
