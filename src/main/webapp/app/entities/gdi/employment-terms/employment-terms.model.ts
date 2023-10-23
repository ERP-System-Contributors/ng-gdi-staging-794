export interface IEmploymentTerms {
  id: number;
  employmentTermsCode?: string | null;
  employmentTermsStatus?: string | null;
}

export type NewEmploymentTerms = Omit<IEmploymentTerms, 'id'> & { id: null };
