import { IKenyanCurrencyDenomination, NewKenyanCurrencyDenomination } from './kenyan-currency-denomination.model';

export const sampleWithRequiredData: IKenyanCurrencyDenomination = {
  id: 4589,
  currencyDenominationCode: 'Saudi wireless',
  currencyDenominationType: 'Designer Delaware',
};

export const sampleWithPartialData: IKenyanCurrencyDenomination = {
  id: 64021,
  currencyDenominationCode: 'Guilder Central ADP',
  currencyDenominationType: 'Handmade Factors synthesizing',
};

export const sampleWithFullData: IKenyanCurrencyDenomination = {
  id: 30517,
  currencyDenominationCode: 'Assistant',
  currencyDenominationType: 'cross-media navigating port',
  currencyDenominationTypeDetails: 'Cliff Uganda',
};

export const sampleWithNewData: NewKenyanCurrencyDenomination = {
  currencyDenominationCode: 'cross-platform Salvador deposit',
  currencyDenominationType: 'Berkshire context-sensitive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
