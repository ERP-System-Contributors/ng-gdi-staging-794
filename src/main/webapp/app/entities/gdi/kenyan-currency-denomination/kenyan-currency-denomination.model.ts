export interface IKenyanCurrencyDenomination {
  id: number;
  currencyDenominationCode?: string | null;
  currencyDenominationType?: string | null;
  currencyDenominationTypeDetails?: string | null;
}

export type NewKenyanCurrencyDenomination = Omit<IKenyanCurrencyDenomination, 'id'> & { id: null };
