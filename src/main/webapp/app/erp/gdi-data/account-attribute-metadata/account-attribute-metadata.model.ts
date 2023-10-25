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

import { IGdiMasterDataIndex } from 'app/entities/gdi/gdi-master-data-index/gdi-master-data-index.model';
import { MandatoryFieldFlagTypes } from 'app/entities/enumerations/mandatory-field-flag-types.model';

export interface IAccountAttributeMetadata {
  id: number;
  precedence?: number | null;
  columnName?: string | null;
  shortName?: string | null;
  detailedDefinition?: string | null;
  dataType?: string | null;
  length?: number | null;
  columnIndex?: string | null;
  mandatoryFieldFlag?: MandatoryFieldFlagTypes | null;
  businessValidation?: string | null;
  technicalValidation?: string | null;
  dbColumnName?: string | null;
  metadataVersion?: number | null;
  standardInputTemplate?: Pick<IGdiMasterDataIndex, 'id'> | null;
}

export type NewAccountAttributeMetadata = Omit<IAccountAttributeMetadata, 'id'> & { id: null };
