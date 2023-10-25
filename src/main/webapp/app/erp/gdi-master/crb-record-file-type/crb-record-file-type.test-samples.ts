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

import { ICrbRecordFileType, NewCrbRecordFileType } from './crb-record-file-type.model';

export const sampleWithRequiredData: ICrbRecordFileType = {
  id: 88186,
  recordFileTypeCode: 'Grocery neutral',
  recordFileType: 'Money',
};

export const sampleWithPartialData: ICrbRecordFileType = {
  id: 84337,
  recordFileTypeCode: 'Front-line',
  recordFileType: 'Chips',
  recordFileTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbRecordFileType = {
  id: 18394,
  recordFileTypeCode: 'copying 24/7',
  recordFileType: 'Rustic Enterprise-wide',
  recordFileTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbRecordFileType = {
  recordFileTypeCode: 'connecting',
  recordFileType: 'Engineer Bedfordshire quantify',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
