import { ICrbAccountStatus, NewCrbAccountStatus } from './crb-account-status.model';

export const sampleWithRequiredData: ICrbAccountStatus = {
  id: 56576,
  accountStatusTypeCode: 'Future Borders grow',
  accountStatusType: 'Product 1080p dot-com',
};

export const sampleWithPartialData: ICrbAccountStatus = {
  id: 166,
  accountStatusTypeCode: 'sexy',
  accountStatusType: 'Towels',
  accountStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbAccountStatus = {
  id: 95565,
  accountStatusTypeCode: 'world-class',
  accountStatusType: 'initiative paradigms Jamaican',
  accountStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbAccountStatus = {
  accountStatusTypeCode: 'Missouri withdrawal',
  accountStatusType: 'synergistic syndicate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
