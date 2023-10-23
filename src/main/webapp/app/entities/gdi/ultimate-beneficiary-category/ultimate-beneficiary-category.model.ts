export interface IUltimateBeneficiaryCategory {
  id: number;
  ultimateBeneficiaryCategoryTypeCode?: string | null;
  ultimateBeneficiaryType?: string | null;
  ultimateBeneficiaryCategoryTypeDetails?: string | null;
}

export type NewUltimateBeneficiaryCategory = Omit<IUltimateBeneficiaryCategory, 'id'> & { id: null };
