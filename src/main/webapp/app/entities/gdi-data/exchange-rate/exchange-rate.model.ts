import dayjs from 'dayjs/esm';
import { IInstitutionCode } from 'app/entities/gdi/institution-code/institution-code.model';
import { IIsoCurrencyCode } from 'app/entities/gdi/iso-currency-code/iso-currency-code.model';

export interface IExchangeRate {
  id: number;
  businessReportingDay?: dayjs.Dayjs | null;
  buyingRate?: number | null;
  sellingRate?: number | null;
  meanRate?: number | null;
  closingBidRate?: number | null;
  closingOfferRate?: number | null;
  usdCrossRate?: number | null;
  institutionCode?: Pick<IInstitutionCode, 'id' | 'institutionName'> | null;
  currencyCode?: Pick<IIsoCurrencyCode, 'id' | 'alphabeticCode'> | null;
}

export type NewExchangeRate = Omit<IExchangeRate, 'id'> & { id: null };
