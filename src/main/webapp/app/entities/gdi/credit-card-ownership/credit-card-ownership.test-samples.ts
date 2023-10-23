import { CreditCardOwnershipTypes } from 'app/entities/enumerations/credit-card-ownership-types.model';

import { ICreditCardOwnership, NewCreditCardOwnership } from './credit-card-ownership.model';

export const sampleWithRequiredData: ICreditCardOwnership = {
  id: 59569,
  creditCardOwnershipCategoryCode: 'program',
  creditCardOwnershipCategoryType: CreditCardOwnershipTypes['INDIVIDUAL'],
};

export const sampleWithPartialData: ICreditCardOwnership = {
  id: 34911,
  creditCardOwnershipCategoryCode: 'blue',
  creditCardOwnershipCategoryType: CreditCardOwnershipTypes['CORPORATE'],
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICreditCardOwnership = {
  id: 47112,
  creditCardOwnershipCategoryCode: 'Managed',
  creditCardOwnershipCategoryType: CreditCardOwnershipTypes['CORPORATE'],
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCreditCardOwnership = {
  creditCardOwnershipCategoryCode: 'Refined',
  creditCardOwnershipCategoryType: CreditCardOwnershipTypes['INDIVIDUAL'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
