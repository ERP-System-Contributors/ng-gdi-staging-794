import { ShareholdingFlagTypes } from 'app/entities/enumerations/shareholding-flag-types.model';

export interface IShareHoldingFlag {
  id: number;
  shareholdingFlagTypeCode?: ShareholdingFlagTypes | null;
  shareholdingFlagType?: string | null;
  shareholdingTypeDescription?: string | null;
}

export type NewShareHoldingFlag = Omit<IShareHoldingFlag, 'id'> & { id: null };
