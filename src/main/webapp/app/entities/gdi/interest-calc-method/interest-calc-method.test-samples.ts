import { IInterestCalcMethod, NewInterestCalcMethod } from './interest-calc-method.model';

export const sampleWithRequiredData: IInterestCalcMethod = {
  id: 55981,
  interestCalculationMethodCode: 'XSS best-of-breed',
  interestCalculationMthodType: 'Roads',
};

export const sampleWithPartialData: IInterestCalcMethod = {
  id: 56386,
  interestCalculationMethodCode: 'Computers User-friendly',
  interestCalculationMthodType: 'Dakota',
};

export const sampleWithFullData: IInterestCalcMethod = {
  id: 78027,
  interestCalculationMethodCode: 'AGP Program',
  interestCalculationMthodType: 'interface',
  interestCalculationMethodDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewInterestCalcMethod = {
  interestCalculationMethodCode: 'Pound',
  interestCalculationMthodType: 'PCI Handcrafted card',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
