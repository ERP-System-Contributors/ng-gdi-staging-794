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

import { ICrbGlCode, NewCrbGlCode } from './crb-gl-code.model';

export const sampleWithRequiredData: ICrbGlCode = {
  id: 51009,
  glCode: 'Burkina',
  glDescription: 'moratorium Turnpike',
  glType: 'technologies',
  institutionCategory: 'Mouse grid-enabled fresh-thinking',
};

export const sampleWithPartialData: ICrbGlCode = {
  id: 19908,
  glCode: 'Kuwaiti base',
  glDescription: 'generation Tasty Granite',
  glType: 'deposit hacking',
  institutionCategory: 'Corporate',
};

export const sampleWithFullData: ICrbGlCode = {
  id: 98413,
  glCode: 'Car parse XML',
  glDescription: 'Buckinghamshire Handmade',
  glType: 'purple',
  institutionCategory: 'Louisiana world-class',
};

export const sampleWithNewData: NewCrbGlCode = {
  glCode: 'deposit Savings Borders',
  glDescription: 'deposit e-markets Tools',
  glType: 'Points Towels Forest',
  institutionCategory: 'impactful',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
