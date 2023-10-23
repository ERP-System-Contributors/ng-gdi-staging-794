import { ICrbSubscriptionStatusTypeCode, NewCrbSubscriptionStatusTypeCode } from './crb-subscription-status-type-code.model';

export const sampleWithRequiredData: ICrbSubscriptionStatusTypeCode = {
  id: 75178,
  subscriptionStatusTypeCode: 'Central Ergonomic',
  subscriptionStatusType: 'e-business Kids calculating',
};

export const sampleWithPartialData: ICrbSubscriptionStatusTypeCode = {
  id: 94881,
  subscriptionStatusTypeCode: 'redefine',
  subscriptionStatusType: 'Avon',
};

export const sampleWithFullData: ICrbSubscriptionStatusTypeCode = {
  id: 22495,
  subscriptionStatusTypeCode: 'Direct',
  subscriptionStatusType: 'Money Fresh',
  subscriptionStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbSubscriptionStatusTypeCode = {
  subscriptionStatusTypeCode: 'Optimized',
  subscriptionStatusType: 'embrace invoice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
