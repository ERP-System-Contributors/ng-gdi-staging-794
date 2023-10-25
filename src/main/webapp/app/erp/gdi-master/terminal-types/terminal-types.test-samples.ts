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

import { ITerminalTypes, NewTerminalTypes } from './terminal-types.model';

export const sampleWithRequiredData: ITerminalTypes = {
  id: 3330,
  txnTerminalTypeCode: 'Auto Fresh',
  txnChannelType: 'Unbranded Small Computers',
};

export const sampleWithPartialData: ITerminalTypes = {
  id: 20171,
  txnTerminalTypeCode: 'homogeneous',
  txnChannelType: 'Optimization challenge solutions',
  txnChannelTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ITerminalTypes = {
  id: 81171,
  txnTerminalTypeCode: 'parallelism',
  txnChannelType: 'compressing generating Agent',
  txnChannelTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewTerminalTypes = {
  txnTerminalTypeCode: 'Health',
  txnChannelType: 'Grass-roots',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
