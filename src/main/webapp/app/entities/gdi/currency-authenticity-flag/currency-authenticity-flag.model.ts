import { CurrencyAuthenticityFlags } from 'app/entities/enumerations/currency-authenticity-flags.model';
import { CurrencyAuthenticityTypes } from 'app/entities/enumerations/currency-authenticity-types.model';

export interface ICurrencyAuthenticityFlag {
  id: number;
  currencyAuthenticityFlag?: CurrencyAuthenticityFlags | null;
  currencyAuthenticityType?: CurrencyAuthenticityTypes | null;
  currencyAuthenticityTypeDetails?: string | null;
}

export type NewCurrencyAuthenticityFlag = Omit<ICurrencyAuthenticityFlag, 'id'> & { id: null };
