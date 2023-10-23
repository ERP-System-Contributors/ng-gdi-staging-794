import { ShareHolderTypes } from 'app/entities/enumerations/share-holder-types.model';

export interface IShareholderType {
  id: number;
  shareHolderTypeCode?: string | null;
  shareHolderType?: ShareHolderTypes | null;
}

export type NewShareholderType = Omit<IShareholderType, 'id'> & { id: null };
