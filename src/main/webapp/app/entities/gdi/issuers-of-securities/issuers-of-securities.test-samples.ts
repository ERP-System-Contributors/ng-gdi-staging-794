import { IIssuersOfSecurities, NewIssuersOfSecurities } from './issuers-of-securities.model';

export const sampleWithRequiredData: IIssuersOfSecurities = {
  id: 20242,
  issuerOfSecuritiesCode: 'primary',
  issuerOfSecurities: 'Handmade hardware',
};

export const sampleWithPartialData: IIssuersOfSecurities = {
  id: 14030,
  issuerOfSecuritiesCode: 'Sports back-end',
  issuerOfSecurities: 'deposit pixel',
};

export const sampleWithFullData: IIssuersOfSecurities = {
  id: 31759,
  issuerOfSecuritiesCode: 'Salad',
  issuerOfSecurities: 'Concrete analyzer',
  issuerOfSecuritiesDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewIssuersOfSecurities = {
  issuerOfSecuritiesCode: 'up lavender invoice',
  issuerOfSecurities: 'Customer-focused',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
