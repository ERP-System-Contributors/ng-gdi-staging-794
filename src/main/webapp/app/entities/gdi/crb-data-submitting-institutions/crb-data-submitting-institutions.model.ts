export interface ICrbDataSubmittingInstitutions {
  id: number;
  institutionCode?: string | null;
  institutionName?: string | null;
  institutionCategory?: string | null;
}

export type NewCrbDataSubmittingInstitutions = Omit<ICrbDataSubmittingInstitutions, 'id'> & { id: null };
