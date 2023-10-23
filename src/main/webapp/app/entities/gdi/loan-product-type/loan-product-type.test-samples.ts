import { ILoanProductType, NewLoanProductType } from './loan-product-type.model';

export const sampleWithRequiredData: ILoanProductType = {
  id: 74955,
  productCode: 'payment Groves Corporate',
  productType: 'Innovative parse',
};

export const sampleWithPartialData: ILoanProductType = {
  id: 65465,
  productCode: 'IB Proactive Vanuatu',
  productType: 'interface deliverables',
  productTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ILoanProductType = {
  id: 25029,
  productCode: 'Customer Czech Kids',
  productType: 'Planner Concrete',
  productTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewLoanProductType = {
  productCode: 'Electronics',
  productType: 'magnetic program Tools',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
