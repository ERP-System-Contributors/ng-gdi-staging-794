import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

import { IFraudCategoryFlag, NewFraudCategoryFlag } from './fraud-category-flag.model';

export const sampleWithRequiredData: IFraudCategoryFlag = {
  id: 32665,
  fraudCategoryFlag: FlagCodes['Y'],
};

export const sampleWithPartialData: IFraudCategoryFlag = {
  id: 7075,
  fraudCategoryFlag: FlagCodes['Y'],
  fraudCategoryTypeDetails: 'payment payment Metrics',
};

export const sampleWithFullData: IFraudCategoryFlag = {
  id: 46368,
  fraudCategoryFlag: FlagCodes['Y'],
  fraudCategoryTypeDetails: 'Dam',
};

export const sampleWithNewData: NewFraudCategoryFlag = {
  fraudCategoryFlag: FlagCodes['N'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
