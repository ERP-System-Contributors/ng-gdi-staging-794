export interface IReasonsForBouncedCheque {
  id: number;
  bouncedChequeReasonsTypeCode?: string | null;
  bouncedChequeReasonsType?: string | null;
}

export type NewReasonsForBouncedCheque = Omit<IReasonsForBouncedCheque, 'id'> & { id: null };
