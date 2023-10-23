import { IUltimateBeneficiaryTypes, NewUltimateBeneficiaryTypes } from './ultimate-beneficiary-types.model';

export const sampleWithRequiredData: IUltimateBeneficiaryTypes = {
  id: 67391,
  ultimateBeneficiaryTypeCode: 'Implemented Gorgeous',
  ultimateBeneficiaryType: 'Marketing Avon Kwacha',
};

export const sampleWithPartialData: IUltimateBeneficiaryTypes = {
  id: 81810,
  ultimateBeneficiaryTypeCode: 'Extension Pizza',
  ultimateBeneficiaryType: 'Garden',
};

export const sampleWithFullData: IUltimateBeneficiaryTypes = {
  id: 20992,
  ultimateBeneficiaryTypeCode: 'Hryvnia deposit',
  ultimateBeneficiaryType: 'RAM engage Bedfordshire',
  ultimateBeneficiaryTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewUltimateBeneficiaryTypes = {
  ultimateBeneficiaryTypeCode: 'indigo',
  ultimateBeneficiaryType: 'Guinea',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
