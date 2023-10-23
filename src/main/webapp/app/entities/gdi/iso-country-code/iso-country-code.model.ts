export interface IIsoCountryCode {
  id: number;
  countryCode?: string | null;
  countryDescription?: string | null;
  continentCode?: string | null;
  continentName?: string | null;
  subRegion?: string | null;
}

export type NewIsoCountryCode = Omit<IIsoCountryCode, 'id'> & { id: null };
