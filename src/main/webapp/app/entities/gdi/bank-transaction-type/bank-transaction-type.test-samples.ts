import { IBankTransactionType, NewBankTransactionType } from './bank-transaction-type.model';

export const sampleWithRequiredData: IBankTransactionType = {
  id: 57773,
  transactionTypeCode: 'Forward Shirt',
  transactionTypeDetails: 'Persevering Nepal Manager',
};

export const sampleWithPartialData: IBankTransactionType = {
  id: 84599,
  transactionTypeCode: 'Group Mississippi Czech',
  transactionTypeDetails: 'Director Shilling card',
};

export const sampleWithFullData: IBankTransactionType = {
  id: 83746,
  transactionTypeCode: 'Practical e-commerce RAM',
  transactionTypeDetails: 'implement Shirt',
};

export const sampleWithNewData: NewBankTransactionType = {
  transactionTypeCode: 'Sterling',
  transactionTypeDetails: 'Response cutting-edge Route',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
