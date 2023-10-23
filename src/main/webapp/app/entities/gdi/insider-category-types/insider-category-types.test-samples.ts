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

import { IInsiderCategoryTypes, NewInsiderCategoryTypes } from './insider-category-types.model';

export const sampleWithRequiredData: IInsiderCategoryTypes = {
  id: 83054,
  insiderCategoryTypeCode: 'Way Interactions proactive',
  insiderCategoryTypeDetail: 'application Bacon',
};

export const sampleWithPartialData: IInsiderCategoryTypes = {
  id: 90202,
  insiderCategoryTypeCode: 'Metal',
  insiderCategoryTypeDetail: 'Coves Proactive Massachusetts',
};

export const sampleWithFullData: IInsiderCategoryTypes = {
  id: 71539,
  insiderCategoryTypeCode: 'Pound primary Sleek',
  insiderCategoryTypeDetail: 'blue silver',
  insiderCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewInsiderCategoryTypes = {
  insiderCategoryTypeCode: 'Rupiah',
  insiderCategoryTypeDetail: 'Producer Applications',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
