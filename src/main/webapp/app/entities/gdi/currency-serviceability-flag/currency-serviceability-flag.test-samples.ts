import { CurrencyServiceabilityFlagTypes } from 'app/entities/enumerations/currency-serviceability-flag-types.model';
import { CurrencyServiceability } from 'app/entities/enumerations/currency-serviceability.model';

import { ICurrencyServiceabilityFlag, NewCurrencyServiceabilityFlag } from './currency-serviceability-flag.model';

export const sampleWithRequiredData: ICurrencyServiceabilityFlag = {
  id: 37670,
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['N'],
  currencyServiceability: CurrencyServiceability['FIT'],
};

export const sampleWithPartialData: ICurrencyServiceabilityFlag = {
  id: 83734,
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['N'],
  currencyServiceability: CurrencyServiceability['FIT'],
  currencyServiceabilityFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICurrencyServiceabilityFlag = {
  id: 54757,
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['Y'],
  currencyServiceability: CurrencyServiceability['UNFIT'],
  currencyServiceabilityFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCurrencyServiceabilityFlag = {
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['Y'],
  currencyServiceability: CurrencyServiceability['UNFIT'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
