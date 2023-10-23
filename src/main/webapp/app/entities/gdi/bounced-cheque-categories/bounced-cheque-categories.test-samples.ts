import { IBouncedChequeCategories, NewBouncedChequeCategories } from './bounced-cheque-categories.model';

export const sampleWithRequiredData: IBouncedChequeCategories = {
  id: 84610,
  bouncedChequeCategoryTypeCode: 'Granite',
  bouncedChequeCategoryType: 'proactive USB pixel',
};

export const sampleWithPartialData: IBouncedChequeCategories = {
  id: 53785,
  bouncedChequeCategoryTypeCode: 'Developer Buckinghamshire Security',
  bouncedChequeCategoryType: 'Loan',
};

export const sampleWithFullData: IBouncedChequeCategories = {
  id: 98008,
  bouncedChequeCategoryTypeCode: 'clear-thinking Regional',
  bouncedChequeCategoryType: 'Mills',
};

export const sampleWithNewData: NewBouncedChequeCategories = {
  bouncedChequeCategoryTypeCode: 'Djibouti bluetooth hacking',
  bouncedChequeCategoryType: 'West Vermont',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
