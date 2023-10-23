import { IInsiderCategoryTypes, NewInsiderCategoryTypes } from './insider-category-types.model';

export const sampleWithRequiredData: IInsiderCategoryTypes = {
  id: 83054,
  insiderCategoryTypeCode: 'Way Interactions proactive',
  insiderCategoryTypeDetail: 'application Bacon',
};

export const sampleWithPartialData: IInsiderCategoryTypes = {
  id: 90202,
  insiderCategoryTypeCode: 'Metal',
  insiderCategoryTypeDetail: 'Coves Proactive Massachusetts',
};

export const sampleWithFullData: IInsiderCategoryTypes = {
  id: 71539,
  insiderCategoryTypeCode: 'Pound primary Sleek',
  insiderCategoryTypeDetail: 'blue silver',
  insiderCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewInsiderCategoryTypes = {
  insiderCategoryTypeCode: 'Rupiah',
  insiderCategoryTypeDetail: 'Producer Applications',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
