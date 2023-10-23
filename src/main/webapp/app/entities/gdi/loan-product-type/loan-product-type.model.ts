export interface ILoanProductType {
  id: number;
  productCode?: string | null;
  productType?: string | null;
  productTypeDescription?: string | null;
}

export type NewLoanProductType = Omit<ILoanProductType, 'id'> & { id: null };
