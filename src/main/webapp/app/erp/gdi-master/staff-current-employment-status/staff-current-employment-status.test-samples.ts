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

import { IStaffCurrentEmploymentStatus, NewStaffCurrentEmploymentStatus } from './staff-current-employment-status.model';

export const sampleWithRequiredData: IStaffCurrentEmploymentStatus = {
  id: 77045,
  staffCurrentEmploymentStatusTypeCode: 'Branch',
  staffCurrentEmploymentStatusType: 'Mozambique',
};

export const sampleWithPartialData: IStaffCurrentEmploymentStatus = {
  id: 5629,
  staffCurrentEmploymentStatusTypeCode: 'calculating',
  staffCurrentEmploymentStatusType: 'e-commerce Niger Legacy',
};

export const sampleWithFullData: IStaffCurrentEmploymentStatus = {
  id: 23419,
  staffCurrentEmploymentStatusTypeCode: 'National Officer hard',
  staffCurrentEmploymentStatusType: 'Shilling Cotton PNG',
  staffCurrentEmploymentStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewStaffCurrentEmploymentStatus = {
  staffCurrentEmploymentStatusTypeCode: 'Buckinghamshire',
  staffCurrentEmploymentStatusType: 'neutral task-force',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
