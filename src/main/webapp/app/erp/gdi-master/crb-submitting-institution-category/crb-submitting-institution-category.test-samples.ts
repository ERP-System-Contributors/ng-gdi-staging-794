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

import { ICrbSubmittingInstitutionCategory, NewCrbSubmittingInstitutionCategory } from './crb-submitting-institution-category.model';

export const sampleWithRequiredData: ICrbSubmittingInstitutionCategory = {
  id: 23415,
  submittingInstitutionCategoryTypeCode: 'Visionary world-class',
  submittingInstitutionCategoryType: 'generating',
};

export const sampleWithPartialData: ICrbSubmittingInstitutionCategory = {
  id: 13951,
  submittingInstitutionCategoryTypeCode: 'Future Wooden Concrete',
  submittingInstitutionCategoryType: 'Rustic Bike New',
  submittingInstitutionCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbSubmittingInstitutionCategory = {
  id: 25732,
  submittingInstitutionCategoryTypeCode: 'Handmade',
  submittingInstitutionCategoryType: 'Marketing redefine',
  submittingInstitutionCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbSubmittingInstitutionCategory = {
  submittingInstitutionCategoryTypeCode: 'distributed Wisconsin',
  submittingInstitutionCategoryType: 'Cambridgeshire Beauty tolerance',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
