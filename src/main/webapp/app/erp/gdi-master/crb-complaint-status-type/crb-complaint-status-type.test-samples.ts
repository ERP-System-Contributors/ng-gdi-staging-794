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

import { ICrbComplaintStatusType, NewCrbComplaintStatusType } from './crb-complaint-status-type.model';

export const sampleWithRequiredData: ICrbComplaintStatusType = {
  id: 92335,
  complaintStatusTypeCode: 'copying world-class',
  complaintStatusType: 'Account Concrete Books',
};

export const sampleWithPartialData: ICrbComplaintStatusType = {
  id: 26937,
  complaintStatusTypeCode: 'global Checking',
  complaintStatusType: 'invoice Analyst bypass',
  complaintStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbComplaintStatusType = {
  id: 78801,
  complaintStatusTypeCode: 'firewall Texas Applications',
  complaintStatusType: 'compressing card Borders',
  complaintStatusDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbComplaintStatusType = {
  complaintStatusTypeCode: 'Pants Architect',
  complaintStatusType: 'optical cross-media',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
