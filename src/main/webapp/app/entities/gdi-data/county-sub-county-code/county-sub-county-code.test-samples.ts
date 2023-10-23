import { ICountySubCountyCode, NewCountySubCountyCode } from './county-sub-county-code.model';

export const sampleWithRequiredData: ICountySubCountyCode = {
  id: 24525,
  subCountyCode: '1616',
  subCountyName: 'National synthesizing well-modulated',
  countyCode: '20',
  countyName: 'core',
};

export const sampleWithPartialData: ICountySubCountyCode = {
  id: 36934,
  subCountyCode: '4256',
  subCountyName: 'calculating seize',
  countyCode: '38',
  countyName: 'Robust e-business e-business',
};

export const sampleWithFullData: ICountySubCountyCode = {
  id: 55370,
  subCountyCode: '7890',
  subCountyName: 'generate',
  countyCode: '71',
  countyName: 'Causeway',
};

export const sampleWithNewData: NewCountySubCountyCode = {
  subCountyCode: '6976',
  subCountyName: 'Bike aggregate Nebraska',
  countyCode: '65',
  countyName: 'Cross-platform deposit Rubber',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
