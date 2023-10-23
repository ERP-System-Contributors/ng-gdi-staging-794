import { IAccountOwnershipType, NewAccountOwnershipType } from './account-ownership-type.model';

export const sampleWithRequiredData: IAccountOwnershipType = {
  id: 45236,
  accountOwnershipTypeCode: 'Aruban',
  accountOwnershipType: 'Total (customarily',
};

export const sampleWithPartialData: IAccountOwnershipType = {
  id: 75349,
  accountOwnershipTypeCode: 'Virginia Renminbi Investor',
  accountOwnershipType: 'Garden Universal California',
};

export const sampleWithFullData: IAccountOwnershipType = {
  id: 2707,
  accountOwnershipTypeCode: 'Refined Gloves Franc',
  accountOwnershipType: 'Unbranded Ruble',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAccountOwnershipType = {
  accountOwnershipTypeCode: 'Valleys Shirt',
  accountOwnershipType: 'Sausages Islands',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
