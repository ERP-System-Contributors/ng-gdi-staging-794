import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IChannelType } from 'app/entities/gdi/channel-type/channel-type.model';
import { ICardBrandType } from 'app/entities/gdi/card-brand-type/card-brand-type.model';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';
import { ICardCategoryType } from 'app/entities/gdi/card-category-type/card-category-type.model';

export interface ICardAcquiringTransaction {
  id: number;
  reportingDate?: dayjs.Dayjs | null;
  terminalId?: string | null;
  numberOfTransactions?: number | null;
  valueOfTransactionsInLCY?: number | null;
  bankCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  channelType?: Pick<IChannelType, 'id' | 'channelTypes'> | null;
  cardBrandType?: Pick<ICardBrandType, 'id' | 'cardBrandType'> | null;
  currencyOfTransaction?: Pick<IIsoCurrencyCode, 'id' | 'alphabeticCode'> | null;
  cardIssuerCategory?: Pick<ICardCategoryType, 'id' | 'cardCategoryDescription'> | null;
}

export type NewCardAcquiringTransaction = Omit<ICardAcquiringTransaction, 'id'> & { id: null };
