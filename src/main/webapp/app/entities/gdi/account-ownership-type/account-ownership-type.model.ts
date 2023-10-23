export interface IAccountOwnershipType {
  id: number;
  accountOwnershipTypeCode?: string | null;
  accountOwnershipType?: string | null;
  description?: string | null;
}

export type NewAccountOwnershipType = Omit<IAccountOwnershipType, 'id'> & { id: null };
