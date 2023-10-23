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
