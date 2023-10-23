import { ICrbAgingBands, NewCrbAgingBands } from './crb-aging-bands.model';

export const sampleWithRequiredData: ICrbAgingBands = {
  id: 52468,
  agingBandCategoryCode: 'Bedfordshire auxiliary',
  agingBandCategory: 'connecting',
  agingBandCategoryDetails: 'Pants',
};

export const sampleWithPartialData: ICrbAgingBands = {
  id: 62440,
  agingBandCategoryCode: 'Checking port Loan',
  agingBandCategory: 'Supervisor Consultant Factors',
  agingBandCategoryDetails: 'Intelligent Lead',
};

export const sampleWithFullData: ICrbAgingBands = {
  id: 30463,
  agingBandCategoryCode: 'Convertible',
  agingBandCategory: 'systematic matrices compress',
  agingBandCategoryDetails: 'Corners',
};

export const sampleWithNewData: NewCrbAgingBands = {
  agingBandCategoryCode: 'Electronics Tasty Baby',
  agingBandCategory: 'azure',
  agingBandCategoryDetails: 'olive Frozen synthesizing',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
