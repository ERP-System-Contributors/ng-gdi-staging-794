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
