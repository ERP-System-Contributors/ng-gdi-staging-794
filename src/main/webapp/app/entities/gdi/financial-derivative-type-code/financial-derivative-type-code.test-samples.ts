import { IFinancialDerivativeTypeCode, NewFinancialDerivativeTypeCode } from './financial-derivative-type-code.model';

export const sampleWithRequiredData: IFinancialDerivativeTypeCode = {
  id: 92235,
  financialDerivativeTypeCode: 'Bike connecting bluetooth',
  financialDerivativeType: 'panel Product',
};

export const sampleWithPartialData: IFinancialDerivativeTypeCode = {
  id: 35482,
  financialDerivativeTypeCode: 'generating Marketing',
  financialDerivativeType: 'Buckinghamshire',
  financialDerivativeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IFinancialDerivativeTypeCode = {
  id: 46430,
  financialDerivativeTypeCode: 'Neck Metal',
  financialDerivativeType: 'grid-enabled user-facing',
  financialDerivativeTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewFinancialDerivativeTypeCode = {
  financialDerivativeTypeCode: 'Forint B2C payment',
  financialDerivativeType: 'input',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
