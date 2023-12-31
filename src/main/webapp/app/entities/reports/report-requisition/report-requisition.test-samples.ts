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

import dayjs from 'dayjs/esm';

import { ReportStatusTypes } from 'app/entities/enumerations/report-status-types.model';

import { IReportRequisition, NewReportRequisition } from './report-requisition.model';

export const sampleWithRequiredData: IReportRequisition = {
  id: 65770,
  reportName: 'architectures Soap harness',
  reportRequestTime: dayjs('2022-06-16T07:33'),
  reportPassword: 'connecting Bedfordshire Ameliorated',
  reportId: 'e96dfb30-9cf8-44c9-b5b1-90de5b76ba97',
};

export const sampleWithPartialData: IReportRequisition = {
  id: 53560,
  reportName: 'Automotive transform',
  reportRequestTime: dayjs('2022-06-15T20:52'),
  reportPassword: 'Grocery Granite expedite',
  reportStatus: ReportStatusTypes['FAILED'],
  reportId: 'c224c61e-b87b-4469-932a-28c688215464',
  reportFileAttachment: '../fake-data/blob/hipster.png',
  reportFileAttachmentContentType: 'unknown',
  reportNotes: '../fake-data/blob/hipster.png',
  reportNotesContentType: 'unknown',
};

export const sampleWithFullData: IReportRequisition = {
  id: 49682,
  reportName: 'functionalities Executive',
  reportRequestTime: dayjs('2022-06-15T13:27'),
  reportPassword: 'logistical',
  reportStatus: ReportStatusTypes['FAILED'],
  reportId: '22253af7-9f11-49d2-8253-984525564857',
  reportFileAttachment: '../fake-data/blob/hipster.png',
  reportFileAttachmentContentType: 'unknown',
  reportFileCheckSum: '../fake-data/blob/hipster.txt',
  reportNotes: '../fake-data/blob/hipster.png',
  reportNotesContentType: 'unknown',
};

export const sampleWithNewData: NewReportRequisition = {
  reportName: 'Rustic mobile',
  reportRequestTime: dayjs('2022-06-15T16:24'),
  reportPassword: 'feed alarm Open-architected',
  reportId: '036650e3-4406-4258-9ead-4d6b298fc826',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
