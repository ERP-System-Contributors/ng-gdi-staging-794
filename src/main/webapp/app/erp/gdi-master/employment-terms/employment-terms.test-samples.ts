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

import { IEmploymentTerms, NewEmploymentTerms } from './employment-terms.model';

export const sampleWithRequiredData: IEmploymentTerms = {
  id: 8098,
  employmentTermsCode: 'Plastic Frozen Rubber',
  employmentTermsStatus: 'implementation',
};

export const sampleWithPartialData: IEmploymentTerms = {
  id: 85211,
  employmentTermsCode: 'challenge Burgs challenge',
  employmentTermsStatus: 'tan Fresh Massachusetts',
};

export const sampleWithFullData: IEmploymentTerms = {
  id: 90249,
  employmentTermsCode: 'mobile Berkshire wireless',
  employmentTermsStatus: 'Handcrafted',
};

export const sampleWithNewData: NewEmploymentTerms = {
  employmentTermsCode: 'CSS',
  employmentTermsStatus: 'quantify payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
