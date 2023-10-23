import { SourceOrPurposeOfRemittancFlag } from 'app/entities/enumerations/source-or-purpose-of-remittanc-flag.model';

export interface ISourceRemittancePurposeType {
  id: number;
  sourceOrPurposeTypeCode?: string | null;
  sourceOrPurposeOfRemittanceFlag?: SourceOrPurposeOfRemittancFlag | null;
  sourceOrPurposeOfRemittanceType?: string | null;
  remittancePurposeTypeDetails?: string | null;
}

export type NewSourceRemittancePurposeType = Omit<ISourceRemittancePurposeType, 'id'> & { id: null };
