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

import { ICrbComplaintType, NewCrbComplaintType } from './crb-complaint-type.model';

export const sampleWithRequiredData: ICrbComplaintType = {
  id: 40372,
  complaintTypeCode: 'web-enabled Refined',
  complaintType: 'Assurance SSL',
};

export const sampleWithPartialData: ICrbComplaintType = {
  id: 27770,
  complaintTypeCode: 'Legacy Unbranded Generic',
  complaintType: 'synergies',
  complaintTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbComplaintType = {
  id: 17883,
  complaintTypeCode: 'Director Buckinghamshire schemas',
  complaintType: 'backing Jewelery Licensed',
  complaintTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbComplaintType = {
  complaintTypeCode: 'Berkshire program well-modulated',
  complaintType: 'Avon Generic models',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
