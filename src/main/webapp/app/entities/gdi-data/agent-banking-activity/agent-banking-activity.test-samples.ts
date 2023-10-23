///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

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
