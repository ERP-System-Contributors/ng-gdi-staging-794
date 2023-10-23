import { CurrencyServiceabilityFlagTypes } from 'app/entities/enumerations/currency-serviceability-flag-types.model';
import { CurrencyServiceability } from 'app/entities/enumerations/currency-serviceability.model';

export interface ICurrencyServiceabilityFlag {
  id: number;
  currencyServiceabilityFlag?: CurrencyServiceabilityFlagTypes | null;
  currencyServiceability?: CurrencyServiceability | null;
  currencyServiceabilityFlagDetails?: string | null;
}

export type NewCurrencyServiceabilityFlag = Omit<ICurrencyServiceabilityFlag, 'id'> & { id: null };
