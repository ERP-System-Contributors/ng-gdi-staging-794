import { ICrbSubmittingInstitutionCategory, NewCrbSubmittingInstitutionCategory } from './crb-submitting-institution-category.model';

export const sampleWithRequiredData: ICrbSubmittingInstitutionCategory = {
  id: 23415,
  submittingInstitutionCategoryTypeCode: 'Visionary world-class',
  submittingInstitutionCategoryType: 'generating',
};

export const sampleWithPartialData: ICrbSubmittingInstitutionCategory = {
  id: 13951,
  submittingInstitutionCategoryTypeCode: 'Future Wooden Concrete',
  submittingInstitutionCategoryType: 'Rustic Bike New',
  submittingInstitutionCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbSubmittingInstitutionCategory = {
  id: 25732,
  submittingInstitutionCategoryTypeCode: 'Handmade',
  submittingInstitutionCategoryType: 'Marketing redefine',
  submittingInstitutionCategoryDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbSubmittingInstitutionCategory = {
  submittingInstitutionCategoryTypeCode: 'distributed Wisconsin',
  submittingInstitutionCategoryType: 'Cambridgeshire Beauty tolerance',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
