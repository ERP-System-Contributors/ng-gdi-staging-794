export interface ICrbProductServiceFeeType {
  id: number;
  chargeTypeCode?: string | null;
  chargeTypeDescription?: string | null;
  chargeTypeCategory?: string | null;
}

export type NewCrbProductServiceFeeType = Omit<ICrbProductServiceFeeType, 'id'> & { id: null };
