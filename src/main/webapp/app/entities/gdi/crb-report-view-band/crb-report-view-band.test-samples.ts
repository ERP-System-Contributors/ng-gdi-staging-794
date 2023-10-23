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

import { ICrbReportViewBand, NewCrbReportViewBand } from './crb-report-view-band.model';

export const sampleWithRequiredData: ICrbReportViewBand = {
  id: 84229,
  reportViewCode: 'PCI SMS',
  reportViewCategory: 'Towels Czech cultivate',
};

export const sampleWithPartialData: ICrbReportViewBand = {
  id: 50961,
  reportViewCode: 'paradigm',
  reportViewCategory: 'Buckinghamshire',
  reportViewCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbReportViewBand = {
  id: 78076,
  reportViewCode: 'Credit HDD',
  reportViewCategory: 'TCP COM',
  reportViewCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbReportViewBand = {
  reportViewCode: 'Interface Object-based feed',
  reportViewCategory: 'Orchestrator Sports Caribbean',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
