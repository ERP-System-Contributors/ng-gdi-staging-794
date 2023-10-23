import { CurrencyAuthenticityFlags } from 'app/entities/enumerations/currency-authenticity-flags.model';
import { CurrencyAuthenticityTypes } from 'app/entities/enumerations/currency-authenticity-types.model';

import { ICurrencyAuthenticityFlag, NewCurrencyAuthenticityFlag } from './currency-authenticity-flag.model';

export const sampleWithRequiredData: ICurrencyAuthenticityFlag = {
  id: 86716,
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['N'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['GENUINE'],
};

export const sampleWithPartialData: ICurrencyAuthenticityFlag = {
  id: 44641,
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['Y'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['GENUINE'],
};

export const sampleWithFullData: ICurrencyAuthenticityFlag = {
  id: 45666,
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['N'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['COUNTERFEIT'],
  currencyAuthenticityTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCurrencyAuthenticityFlag = {
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['Y'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['GENUINE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
