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

import dayjs from 'dayjs/esm';

import { IInstitutionCode, NewInstitutionCode } from './institution-code.model';

export const sampleWithRequiredData: IInstitutionCode = {
  id: 9008,
  institutionCode: 'cultivate',
  institutionName: 'payment',
};

export const sampleWithPartialData: IInstitutionCode = {
  id: 46435,
  institutionCode: 'eco-centric bottom-line programming',
  institutionName: 'robust bandwidth',
  shortName: 'Alabama',
  institutionCategory: 'Response Music integrated',
  institutionStatus: 'Infrastructure',
};

export const sampleWithFullData: IInstitutionCode = {
  id: 73224,
  institutionCode: 'Legacy',
  institutionName: 'National Berkshire',
  shortName: 'Movies',
  category: 'schemas Architect quantify',
  institutionCategory: 'bus',
  institutionOwnership: 'Tuna card Stand-alone',
  dateLicensed: dayjs('2022-04-05'),
  institutionStatus: 'Berkshire Avon reboot',
};

export const sampleWithNewData: NewInstitutionCode = {
  institutionCode: 'non-volatile',
  institutionName: 'generate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
