export interface ISnaSectorCode {
  id: number;
  sectorTypeCode?: string | null;
  mainSectorCode?: string | null;
  mainSectorTypeName?: string | null;
  subSectorCode?: string | null;
  subSectorName?: string | null;
  subSubSectorCode?: string | null;
  subSubSectorName?: string | null;
}

export type NewSnaSectorCode = Omit<ISnaSectorCode, 'id'> & { id: null };
