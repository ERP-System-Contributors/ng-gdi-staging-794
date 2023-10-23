import dayjs from 'dayjs/esm';

import { IAgentBankingActivity, NewAgentBankingActivity } from './agent-banking-activity.model';

export const sampleWithRequiredData: IAgentBankingActivity = {
  id: 29353,
  reportingDate: dayjs('2023-10-03'),
  agentUniqueId: 'Unbranded Technician CSS',
  terminalUniqueId: 'Strategist hard',
  totalCountOfTransactions: 17698,
  totalValueOfTransactionsInLCY: 16714,
};

export const sampleWithPartialData: IAgentBankingActivity = {
  id: 56776,
  reportingDate: dayjs('2023-10-03'),
  agentUniqueId: 'Home Mouse',
  terminalUniqueId: 'Money protocol Buckinghamshire',
  totalCountOfTransactions: 40166,
  totalValueOfTransactionsInLCY: 71057,
};

export const sampleWithFullData: IAgentBankingActivity = {
  id: 81247,
  reportingDate: dayjs('2023-10-04'),
  agentUniqueId: 'navigate Metrics Small',
  terminalUniqueId: 'New feed',
  totalCountOfTransactions: 84852,
  totalValueOfTransactionsInLCY: 60464,
};

export const sampleWithNewData: NewAgentBankingActivity = {
  reportingDate: dayjs('2023-10-03'),
  agentUniqueId: 'Kroon evolve Dynamic',
  terminalUniqueId: 'Metal',
  totalCountOfTransactions: 76537,
  totalValueOfTransactionsInLCY: 3958,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
