export interface ICountySubCountyCode {
  id: number;
  subCountyCode?: string | null;
  subCountyName?: string | null;
  countyCode?: string | null;
  countyName?: string | null;
}

export type NewCountySubCountyCode = Omit<ICountySubCountyCode, 'id'> & { id: null };
