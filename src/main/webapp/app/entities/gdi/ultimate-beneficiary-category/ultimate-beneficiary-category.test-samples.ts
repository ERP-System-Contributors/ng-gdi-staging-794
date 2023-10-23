import { IUltimateBeneficiaryCategory, NewUltimateBeneficiaryCategory } from './ultimate-beneficiary-category.model';

export const sampleWithRequiredData: IUltimateBeneficiaryCategory = {
  id: 50909,
  ultimateBeneficiaryCategoryTypeCode: 'deposit',
  ultimateBeneficiaryType: 'recontextualize directional withdrawal',
};

export const sampleWithPartialData: IUltimateBeneficiaryCategory = {
  id: 77416,
  ultimateBeneficiaryCategoryTypeCode: 'internet redundant Account',
  ultimateBeneficiaryType: 'open navigating',
};

export const sampleWithFullData: IUltimateBeneficiaryCategory = {
  id: 92595,
  ultimateBeneficiaryCategoryTypeCode: 'Technician SSL Wisconsin',
  ultimateBeneficiaryType: 'array Monaco Steel',
  ultimateBeneficiaryCategoryTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewUltimateBeneficiaryCategory = {
  ultimateBeneficiaryCategoryTypeCode: 'Ireland',
  ultimateBeneficiaryType: 'secondary programming Adaptive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
