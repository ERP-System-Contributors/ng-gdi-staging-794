export interface ICrbAmountCategoryBand {
  id: number;
  amountCategoryBandCode?: string | null;
  amountCategoryBand?: string | null;
  amountCategoryBandDetails?: string | null;
}

export type NewCrbAmountCategoryBand = Omit<ICrbAmountCategoryBand, 'id'> & { id: null };
