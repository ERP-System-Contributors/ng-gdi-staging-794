import { ICrbAgentServiceType, NewCrbAgentServiceType } from './crb-agent-service-type.model';

export const sampleWithRequiredData: ICrbAgentServiceType = {
  id: 95314,
  agentServiceTypeCode: 'infrastructures architect',
};

export const sampleWithPartialData: ICrbAgentServiceType = {
  id: 87676,
  agentServiceTypeCode: 'bandwidth',
  agentServiceTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbAgentServiceType = {
  id: 92269,
  agentServiceTypeCode: 'Equatorial CFP unleash',
  agentServiceTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbAgentServiceType = {
  agentServiceTypeCode: 'transparent',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
