export interface IFinancialDerivativeTypeCode {
  id: number;
  financialDerivativeTypeCode?: string | null;
  financialDerivativeType?: string | null;
  financialDerivativeTypeDetails?: string | null;
}

export type NewFinancialDerivativeTypeCode = Omit<IFinancialDerivativeTypeCode, 'id'> & { id: null };
