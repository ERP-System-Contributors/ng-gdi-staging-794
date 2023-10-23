export interface ICustomerType {
  id: number;
  customerTypeCode?: string | null;
  customerType?: string | null;
  customerTypeDescription?: string | null;
}

export type NewCustomerType = Omit<ICustomerType, 'id'> & { id: null };
