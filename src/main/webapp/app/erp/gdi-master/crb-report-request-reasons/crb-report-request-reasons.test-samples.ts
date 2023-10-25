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

import { ICrbReportRequestReasons, NewCrbReportRequestReasons } from './crb-report-request-reasons.model';

export const sampleWithRequiredData: ICrbReportRequestReasons = {
  id: 38346,
  creditReportRequestReasonTypeCode: 'Grocery',
  creditReportRequestReasonType: 'driver Rubber Delaware',
};

export const sampleWithPartialData: ICrbReportRequestReasons = {
  id: 77887,
  creditReportRequestReasonTypeCode: 'responsive calculating Analyst',
  creditReportRequestReasonType: 'connect salmon back-end',
};

export const sampleWithFullData: ICrbReportRequestReasons = {
  id: 59430,
  creditReportRequestReasonTypeCode: 'index parse Rubber',
  creditReportRequestReasonType: 'mesh open-source Fundamental',
  creditReportRequestDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbReportRequestReasons = {
  creditReportRequestReasonTypeCode: '1080p Gorgeous Prairie',
  creditReportRequestReasonType: 'Car',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
