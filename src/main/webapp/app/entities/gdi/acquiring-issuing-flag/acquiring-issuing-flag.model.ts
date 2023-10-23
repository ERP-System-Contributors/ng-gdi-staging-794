export interface IAcquiringIssuingFlag {
  id: number;
  cardAcquiringIssuingFlagCode?: string | null;
  cardAcquiringIssuingDescription?: string | null;
  cardAcquiringIssuingDetails?: string | null;
}

export type NewAcquiringIssuingFlag = Omit<IAcquiringIssuingFlag, 'id'> & { id: null };
