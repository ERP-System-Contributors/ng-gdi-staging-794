import { IExecutiveCategoryType, NewExecutiveCategoryType } from './executive-category-type.model';

export const sampleWithRequiredData: IExecutiveCategoryType = {
  id: 35305,
  directorCategoryTypeCode: 'pixel',
  directorCategoryType: 'Maine architect bluetooth',
};

export const sampleWithPartialData: IExecutiveCategoryType = {
  id: 22997,
  directorCategoryTypeCode: 'Exclusive Chips Botswana',
  directorCategoryType: 'Granite quantifying',
};

export const sampleWithFullData: IExecutiveCategoryType = {
  id: 27130,
  directorCategoryTypeCode: 'Berkshire',
  directorCategoryType: 'mindshare',
  directorCategoryTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewExecutiveCategoryType = {
  directorCategoryTypeCode: 'Profit-focused',
  directorCategoryType: 'Checking Intuitive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
