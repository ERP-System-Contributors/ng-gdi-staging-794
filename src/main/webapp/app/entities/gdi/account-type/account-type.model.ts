export interface IAccountType {
  id: number;
  accountTypeCode?: string | null;
  accountType?: string | null;
  description?: string | null;
}

export type NewAccountType = Omit<IAccountType, 'id'> & { id: null };
