import { IFxCustomerType, NewFxCustomerType } from './fx-customer-type.model';

export const sampleWithRequiredData: IFxCustomerType = {
  id: 30023,
  foreignExchangeCustomerTypeCode: 'embrace Cambridgeshire Sao',
  foreignCustomerType: 'Bike',
};

export const sampleWithPartialData: IFxCustomerType = {
  id: 3033,
  foreignExchangeCustomerTypeCode: 'Gloves',
  foreignCustomerType: 'web-enabled Grass-roots',
};

export const sampleWithFullData: IFxCustomerType = {
  id: 46511,
  foreignExchangeCustomerTypeCode: 'Streamlined Optional',
  foreignCustomerType: 'Bermuda',
};

export const sampleWithNewData: NewFxCustomerType = {
  foreignExchangeCustomerTypeCode: 'model workforce Accountability',
  foreignCustomerType: 'solid',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
