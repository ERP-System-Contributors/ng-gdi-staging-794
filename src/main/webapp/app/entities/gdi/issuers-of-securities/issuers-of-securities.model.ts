export interface IIssuersOfSecurities {
  id: number;
  issuerOfSecuritiesCode?: string | null;
  issuerOfSecurities?: string | null;
  issuerOfSecuritiesDescription?: string | null;
}

export type NewIssuersOfSecurities = Omit<IIssuersOfSecurities, 'id'> & { id: null };
