export interface IDerivativeSubType {
  id: number;
  financialDerivativeSubTypeCode?: string | null;
  financialDerivativeSubTye?: string | null;
  financialDerivativeSubtypeDetails?: string | null;
}

export type NewDerivativeSubType = Omit<IDerivativeSubType, 'id'> & { id: null };
