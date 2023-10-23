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

import { IBouncedChequeCategories, NewBouncedChequeCategories } from './bounced-cheque-categories.model';

export const sampleWithRequiredData: IBouncedChequeCategories = {
  id: 84610,
  bouncedChequeCategoryTypeCode: 'Granite',
  bouncedChequeCategoryType: 'proactive USB pixel',
};

export const sampleWithPartialData: IBouncedChequeCategories = {
  id: 53785,
  bouncedChequeCategoryTypeCode: 'Developer Buckinghamshire Security',
  bouncedChequeCategoryType: 'Loan',
};

export const sampleWithFullData: IBouncedChequeCategories = {
  id: 98008,
  bouncedChequeCategoryTypeCode: 'clear-thinking Regional',
  bouncedChequeCategoryType: 'Mills',
};

export const sampleWithNewData: NewBouncedChequeCategories = {
  bouncedChequeCategoryTypeCode: 'Djibouti bluetooth hacking',
  bouncedChequeCategoryType: 'West Vermont',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
