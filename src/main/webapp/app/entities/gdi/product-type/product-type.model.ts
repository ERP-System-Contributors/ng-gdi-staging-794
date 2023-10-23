export interface IProductType {
  id: number;
  productCode?: string | null;
  productType?: string | null;
  productTypeDescription?: string | null;
}

export type NewProductType = Omit<IProductType, 'id'> & { id: null };
