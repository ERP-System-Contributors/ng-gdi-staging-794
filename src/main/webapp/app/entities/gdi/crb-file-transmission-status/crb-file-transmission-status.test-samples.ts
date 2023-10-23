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

import { SubmittedFileStatusTypes } from 'app/entities/enumerations/submitted-file-status-types.model';

import { ICrbFileTransmissionStatus, NewCrbFileTransmissionStatus } from './crb-file-transmission-status.model';

export const sampleWithRequiredData: ICrbFileTransmissionStatus = {
  id: 34417,
  submittedFileStatusTypeCode: 'applications Solomon back',
  submittedFileStatusType: SubmittedFileStatusTypes['INCORRECT'],
};

export const sampleWithPartialData: ICrbFileTransmissionStatus = {
  id: 1263,
  submittedFileStatusTypeCode: 'web synthesize Riel',
  submittedFileStatusType: SubmittedFileStatusTypes['INCORRECT'],
  submittedFileStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbFileTransmissionStatus = {
  id: 32731,
  submittedFileStatusTypeCode: 'Security Books network',
  submittedFileStatusType: SubmittedFileStatusTypes['CORRECT'],
  submittedFileStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbFileTransmissionStatus = {
  submittedFileStatusTypeCode: 'demand-driven silver',
  submittedFileStatusType: SubmittedFileStatusTypes['CORRECT'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
