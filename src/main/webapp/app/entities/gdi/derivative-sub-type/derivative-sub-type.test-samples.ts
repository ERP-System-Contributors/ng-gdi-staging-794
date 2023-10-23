import { IDerivativeSubType, NewDerivativeSubType } from './derivative-sub-type.model';

export const sampleWithRequiredData: IDerivativeSubType = {
  id: 97007,
  financialDerivativeSubTypeCode: 'Romania',
  financialDerivativeSubTye: 'testing Account Chicken',
};

export const sampleWithPartialData: IDerivativeSubType = {
  id: 62889,
  financialDerivativeSubTypeCode: 'knowledge transmitter',
  financialDerivativeSubTye: 'Metal',
  financialDerivativeSubtypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDerivativeSubType = {
  id: 48955,
  financialDerivativeSubTypeCode: 'payment Functionality',
  financialDerivativeSubTye: 'Salvador Designer Handmade',
  financialDerivativeSubtypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDerivativeSubType = {
  financialDerivativeSubTypeCode: 'Estonia',
  financialDerivativeSubTye: 'index synthesizing leverage',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
