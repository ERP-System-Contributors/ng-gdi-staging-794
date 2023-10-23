import { ICrbAccountHolderType, NewCrbAccountHolderType } from './crb-account-holder-type.model';

export const sampleWithRequiredData: ICrbAccountHolderType = {
  id: 33791,
  accountHolderCategoryTypeCode: 'SDD',
  accountHolderCategoryType: 'Industrial',
};

export const sampleWithPartialData: ICrbAccountHolderType = {
  id: 59237,
  accountHolderCategoryTypeCode: 'Handcrafted parallelism',
  accountHolderCategoryType: 'Loan interface',
};

export const sampleWithFullData: ICrbAccountHolderType = {
  id: 21479,
  accountHolderCategoryTypeCode: 'payment synthesize Avon',
  accountHolderCategoryType: 'Illinois',
};

export const sampleWithNewData: NewCrbAccountHolderType = {
  accountHolderCategoryTypeCode: 'Savings Representative Regional',
  accountHolderCategoryType: 'bypass Division',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
