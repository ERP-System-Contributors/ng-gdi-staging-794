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

import { IContractStatus, NewContractStatus } from './contract-status.model';

export const sampleWithRequiredData: IContractStatus = {
  id: 73473,
  contractStatusCode: 'Lead Keyboard Mouse',
  contractStatusType: 'global Latvian',
};

export const sampleWithPartialData: IContractStatus = {
  id: 45004,
  contractStatusCode: 'real-time Computer Avon',
  contractStatusType: 'Principal Quality multi-tasking',
};

export const sampleWithFullData: IContractStatus = {
  id: 50781,
  contractStatusCode: 'real-time',
  contractStatusType: 'grid-enabled',
  contractStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewContractStatus = {
  contractStatusCode: 'e-commerce Liaison back',
  contractStatusType: 'Micronesia',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
