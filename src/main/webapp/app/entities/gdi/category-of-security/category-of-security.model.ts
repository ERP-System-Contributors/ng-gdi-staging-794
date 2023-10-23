export interface ICategoryOfSecurity {
  id: number;
  categoryOfSecurity?: string | null;
  categoryOfSecurityDetails?: string | null;
  categoryOfSecurityDescription?: string | null;
}

export type NewCategoryOfSecurity = Omit<ICategoryOfSecurity, 'id'> & { id: null };
