export interface ICrbCreditFacilityType {
  id: number;
  creditFacilityTypeCode?: string | null;
  creditFacilityType?: string | null;
  creditFacilityDescription?: string | null;
}

export type NewCrbCreditFacilityType = Omit<ICrbCreditFacilityType, 'id'> & { id: null };
