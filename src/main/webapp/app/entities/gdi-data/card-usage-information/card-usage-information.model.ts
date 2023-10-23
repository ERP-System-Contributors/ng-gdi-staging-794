import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { ICardTypes } from 'app/entities/gdi/card-types/card-types.model';
import { ICardBrandType } from 'app/entities/gdi/card-brand-type/card-brand-type.model';
import { ICardCategoryType } from 'app/entities/gdi/card-category-type/card-category-type.model';
import { IBankTransactionType } from 'app/entities/gdi/bank-transaction-type/bank-transaction-type.model';
import { IChannelType } from 'app/entities/gdi/channel-type/channel-type.model';
import { ICardState } from 'app/entities/gdi-data/card-state/card-state.model';

export interface ICardUsageInformation {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  totalNumberOfLiveCards?: number | null;
  totalActiveCards?: number | null;
  totalNumberOfTransactionsDone?: number | null;
  totalValueOfTransactionsDoneInLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  cardType?: Pick<ICardTypes, 'id' | 'cardType'> | null;
  cardBrand?: Pick<ICardBrandType, 'id' | 'cardBrandType'> | null;
  cardCategoryType?: Pick<ICardCategoryType, 'id' | 'cardCategoryDescription'> | null;
  transactionType?: Pick<IBankTransactionType, 'id' | 'transactionTypeDetails'> | null;
  channelType?: Pick<IChannelType, 'id' | 'channelTypes'> | null;
  cardState?: Pick<ICardState, 'id' | 'cardStateFlagDetails'> | null;
}

export type NewCardUsageInformation = Omit<ICardUsageInformation, 'id'> & { id: null };
