export interface IInterestCalcMethod {
  id: number;
  interestCalculationMethodCode?: string | null;
  interestCalculationMthodType?: string | null;
  interestCalculationMethodDetails?: string | null;
}

export type NewInterestCalcMethod = Omit<IInterestCalcMethod, 'id'> & { id: null };
