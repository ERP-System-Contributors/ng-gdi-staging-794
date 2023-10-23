export interface ICrbSubmittingInstitutionCategory {
  id: number;
  submittingInstitutionCategoryTypeCode?: string | null;
  submittingInstitutionCategoryType?: string | null;
  submittingInstitutionCategoryDetails?: string | null;
}

export type NewCrbSubmittingInstitutionCategory = Omit<ICrbSubmittingInstitutionCategory, 'id'> & { id: null };
