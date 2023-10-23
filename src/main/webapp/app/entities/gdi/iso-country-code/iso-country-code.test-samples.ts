import { IIsoCountryCode, NewIsoCountryCode } from './iso-country-code.model';

export const sampleWithRequiredData: IIsoCountryCode = {
  id: 18877,
};

export const sampleWithPartialData: IIsoCountryCode = {
  id: 70160,
  countryDescription: 'XSS Haiti initiatives',
  continentCode: 'Car circuit',
  continentName: 'Fantastic',
};

export const sampleWithFullData: IIsoCountryCode = {
  id: 23595,
  countryCode: 'ER',
  countryDescription: 'national',
  continentCode: 'technologies',
  continentName: 'Strategist',
  subRegion: 'matrix synthesize mobile',
};

export const sampleWithNewData: NewIsoCountryCode = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
