import { IContractStatus, NewContractStatus } from './contract-status.model';

export const sampleWithRequiredData: IContractStatus = {
  id: 73473,
  contractStatusCode: 'Lead Keyboard Mouse',
  contractStatusType: 'global Latvian',
};

export const sampleWithPartialData: IContractStatus = {
  id: 45004,
  contractStatusCode: 'real-time Computer Avon',
  contractStatusType: 'Principal Quality multi-tasking',
};

export const sampleWithFullData: IContractStatus = {
  id: 50781,
  contractStatusCode: 'real-time',
  contractStatusType: 'grid-enabled',
  contractStatusTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewContractStatus = {
  contractStatusCode: 'e-commerce Liaison back',
  contractStatusType: 'Micronesia',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
