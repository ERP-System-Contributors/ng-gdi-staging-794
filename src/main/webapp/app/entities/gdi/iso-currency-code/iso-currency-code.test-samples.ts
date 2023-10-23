import { IIsoCurrencyCode, NewIsoCurrencyCode } from './iso-currency-code.model';

export const sampleWithRequiredData: IIsoCurrencyCode = {
  id: 41449,
  alphabeticCode: 'navigate Arizona bypassing',
  numericCode: 'Nebraska Realigned bus',
  minorUnit: 'gold Nebraska',
  currency: 'out-of-the-box Borders Direct',
};

export const sampleWithPartialData: IIsoCurrencyCode = {
  id: 764,
  alphabeticCode: 'Electronics',
  numericCode: 'Rustic',
  minorUnit: 'tertiary JBOD JSON',
  currency: '(customarily',
  country: 'Wallis and Futuna',
};

export const sampleWithFullData: IIsoCurrencyCode = {
  id: 18481,
  alphabeticCode: 'deposit frame Direct',
  numericCode: 'disintermediate synthesize',
  minorUnit: 'grow compelling Tennessee',
  currency: 'object-oriented Frozen Principal',
  country: 'Norway',
};

export const sampleWithNewData: NewIsoCurrencyCode = {
  alphabeticCode: 'matrix',
  numericCode: 'Dollar zero',
  minorUnit: 'Plastic Electronics',
  currency: 'Hat National',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
