export interface ICommitteeType {
  id: number;
  committeeTypeCode?: string | null;
  committeeType?: string | null;
  committeeTypeDetails?: string | null;
}

export type NewCommitteeType = Omit<ICommitteeType, 'id'> & { id: null };
