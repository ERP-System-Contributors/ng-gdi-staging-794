export interface IUltimateBeneficiaryTypes {
  id: number;
  ultimateBeneficiaryTypeCode?: string | null;
  ultimateBeneficiaryType?: string | null;
  ultimateBeneficiaryTypeDetails?: string | null;
}

export type NewUltimateBeneficiaryTypes = Omit<IUltimateBeneficiaryTypes, 'id'> & { id: null };
