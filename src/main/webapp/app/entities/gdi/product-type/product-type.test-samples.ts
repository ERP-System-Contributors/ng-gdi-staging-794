import { IProductType, NewProductType } from './product-type.model';

export const sampleWithRequiredData: IProductType = {
  id: 29562,
  productCode: 'Licensed',
};

export const sampleWithPartialData: IProductType = {
  id: 97871,
  productCode: 'parsing Marketing extensible',
  productType: 'Electronics Kentucky',
  productTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IProductType = {
  id: 58762,
  productCode: 'bluetooth implement',
  productType: 'Paradigm cultivate focus',
  productTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewProductType = {
  productCode: 'Ergonomic',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
