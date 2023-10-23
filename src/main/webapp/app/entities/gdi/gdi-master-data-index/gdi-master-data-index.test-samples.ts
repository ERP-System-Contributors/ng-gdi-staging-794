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

import { IGdiMasterDataIndex, NewGdiMasterDataIndex } from './gdi-master-data-index.model';

export const sampleWithRequiredData: IGdiMasterDataIndex = {
  id: 71458,
  entityName: 'Enterprise-wide firewall robust',
  databaseName: 'parse Bacon',
};

export const sampleWithPartialData: IGdiMasterDataIndex = {
  id: 35382,
  entityName: 'purple Small PCI',
  databaseName: 'Dollar SDD needs-based',
  businessDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IGdiMasterDataIndex = {
  id: 40469,
  entityName: 'Applications Infrastructure',
  databaseName: 'quantify 24/7 Electronics',
  businessDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewGdiMasterDataIndex = {
  entityName: 'Palau Operations Personal',
  databaseName: 'Sausages',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
