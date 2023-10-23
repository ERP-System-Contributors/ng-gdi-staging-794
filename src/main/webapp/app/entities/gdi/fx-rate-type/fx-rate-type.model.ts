export interface IFxRateType {
  id: number;
  fxRateCode?: string | null;
  fxRateType?: string | null;
  fxRateDetails?: string | null;
}

export type NewFxRateType = Omit<IFxRateType, 'id'> & { id: null };
