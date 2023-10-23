export interface IPartyRelationType {
  id: number;
  partyRelationTypeCode?: string | null;
  partyRelationType?: string | null;
  partyRelationTypeDescription?: string | null;
}

export type NewPartyRelationType = Omit<IPartyRelationType, 'id'> & { id: null };
