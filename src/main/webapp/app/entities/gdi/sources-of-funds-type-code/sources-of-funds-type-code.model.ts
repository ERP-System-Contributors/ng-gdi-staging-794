export interface ISourcesOfFundsTypeCode {
  id: number;
  sourceOfFundsTypeCode?: string | null;
  sourceOfFundsType?: string | null;
  sourceOfFundsTypeDetails?: string | null;
}

export type NewSourcesOfFundsTypeCode = Omit<ISourcesOfFundsTypeCode, 'id'> & { id: null };
