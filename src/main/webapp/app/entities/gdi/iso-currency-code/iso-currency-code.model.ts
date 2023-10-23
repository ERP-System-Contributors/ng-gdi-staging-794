export interface IIsoCurrencyCode {
  id: number;
  alphabeticCode?: string | null;
  numericCode?: string | null;
  minorUnit?: string | null;
  currency?: string | null;
  country?: string | null;
}

export type NewIsoCurrencyCode = Omit<IIsoCurrencyCode, 'id'> & { id: null };
