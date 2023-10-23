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

import { ICustomerComplaintStatusType, NewCustomerComplaintStatusType } from './customer-complaint-status-type.model';

export const sampleWithRequiredData: ICustomerComplaintStatusType = {
  id: 77368,
  customerComplaintStatusTypeCode: 'Proactive',
  customerComplaintStatusType: 'Graphical Music',
};

export const sampleWithPartialData: ICustomerComplaintStatusType = {
  id: 35351,
  customerComplaintStatusTypeCode: 'Intuitive',
  customerComplaintStatusType: 'Lights Marketing Oklahoma',
  customerComplaintStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICustomerComplaintStatusType = {
  id: 49710,
  customerComplaintStatusTypeCode: 'seize',
  customerComplaintStatusType: 'Arkansas reintermediate Ways',
  customerComplaintStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCustomerComplaintStatusType = {
  customerComplaintStatusTypeCode: 'Fresh array Crossroad',
  customerComplaintStatusType: 'Steel payment',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
