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

import { ISnaSectorCode, NewSnaSectorCode } from './sna-sector-code.model';

export const sampleWithRequiredData: ISnaSectorCode = {
  id: 18473,
  sectorTypeCode: 'Ariary olive Florida',
};

export const sampleWithPartialData: ISnaSectorCode = {
  id: 10016,
  sectorTypeCode: 'payment Account',
  mainSectorCode: 'Fundamental Forward',
  subSectorCode: 'protocol',
  subSectorName: 'withdrawal XML',
  subSubSectorCode: 'quantifying',
};

export const sampleWithFullData: ISnaSectorCode = {
  id: 49475,
  sectorTypeCode: 'reboot Intelligent Quality',
  mainSectorCode: 'e-commerce',
  mainSectorTypeName: 'AGP solid',
  subSectorCode: 'Markets plug-and-play Chief',
  subSectorName: 'ivory Data payment',
  subSubSectorCode: 'Table Plastic',
  subSubSectorName: 'Nepalese',
};

export const sampleWithNewData: NewSnaSectorCode = {
  sectorTypeCode: 'Spring Fresh infomediaries',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
