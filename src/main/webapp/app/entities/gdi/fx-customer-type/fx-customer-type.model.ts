export interface IFxCustomerType {
  id: number;
  foreignExchangeCustomerTypeCode?: string | null;
  foreignCustomerType?: string | null;
}

export type NewFxCustomerType = Omit<IFxCustomerType, 'id'> & { id: null };
