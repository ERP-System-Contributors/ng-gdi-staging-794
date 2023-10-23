export interface IInterbankSectorCode {
  id: number;
  interbankSectorCode?: string | null;
  interbankSectorCodeDescription?: string | null;
}

export type NewInterbankSectorCode = Omit<IInterbankSectorCode, 'id'> & { id: null };
