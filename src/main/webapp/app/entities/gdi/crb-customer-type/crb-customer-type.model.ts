export interface ICrbCustomerType {
  id: number;
  customerTypeCode?: string | null;
  customerType?: string | null;
  description?: string | null;
}

export type NewCrbCustomerType = Omit<ICrbCustomerType, 'id'> & { id: null };
