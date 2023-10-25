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
import { UpdateFrequencyTypes } from 'app/entities/enumerations/update-frequency-types.model';
import { DatasetBehaviorTypes } from 'app/entities/enumerations/dataset-behavior-types.model';

export interface IGdiTransactionDataIndex {
  id: number;
  datasetName?: string | null;
  databaseName?: string | null;
  updateFrequency?: UpdateFrequencyTypes | null;
  datasetBehavior?: DatasetBehaviorTypes | null;
  minimumDatarowsPerRequest?: number | null;
  maximumDataRowsPerRequest?: number | null;
  datasetDescription?: string | null;
  dataTemplate?: string | null;
  dataTemplateContentType?: string | null;
  masterDataItems?: Pick<IGdiMasterDataIndex, 'id' | 'entityName'>[] | null;
}

export type NewGdiTransactionDataIndex = Omit<IGdiTransactionDataIndex, 'id'> & { id: null };
