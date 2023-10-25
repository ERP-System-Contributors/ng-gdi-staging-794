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

import { IUltimateBeneficiaryCategory, NewUltimateBeneficiaryCategory } from './ultimate-beneficiary-category.model';

export const sampleWithRequiredData: IUltimateBeneficiaryCategory = {
  id: 50909,
  ultimateBeneficiaryCategoryTypeCode: 'deposit',
  ultimateBeneficiaryType: 'recontextualize directional withdrawal',
};

export const sampleWithPartialData: IUltimateBeneficiaryCategory = {
  id: 77416,
  ultimateBeneficiaryCategoryTypeCode: 'internet redundant Account',
  ultimateBeneficiaryType: 'open navigating',
};

export const sampleWithFullData: IUltimateBeneficiaryCategory = {
  id: 92595,
  ultimateBeneficiaryCategoryTypeCode: 'Technician SSL Wisconsin',
  ultimateBeneficiaryType: 'array Monaco Steel',
  ultimateBeneficiaryCategoryTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewUltimateBeneficiaryCategory = {
  ultimateBeneficiaryCategoryTypeCode: 'Ireland',
  ultimateBeneficiaryType: 'secondary programming Adaptive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
