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

import { ICrbDataSubmittingInstitutions, NewCrbDataSubmittingInstitutions } from './crb-data-submitting-institutions.model';

export const sampleWithRequiredData: ICrbDataSubmittingInstitutions = {
  id: 39299,
  institutionCode: 'Buckinghamshire Agent Leone',
  institutionName: 'open salmon Bedfordshire',
  institutionCategory: 'Shoes scalable',
};

export const sampleWithPartialData: ICrbDataSubmittingInstitutions = {
  id: 95059,
  institutionCode: 'indigo',
  institutionName: 'withdrawal Ameliorated',
  institutionCategory: 'viral Timor-Leste',
};

export const sampleWithFullData: ICrbDataSubmittingInstitutions = {
  id: 38160,
  institutionCode: 'violet payment Palau',
  institutionName: 'Field',
  institutionCategory: 'improvement Wooden',
};

export const sampleWithNewData: NewCrbDataSubmittingInstitutions = {
  institutionCode: 'Licensed',
  institutionName: 'Incredible homogeneous',
  institutionCategory: 'Carolina',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
