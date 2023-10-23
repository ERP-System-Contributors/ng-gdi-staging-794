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

import { RemittanceTypeFlag } from 'app/entities/enumerations/remittance-type-flag.model';
import { RemittanceType } from 'app/entities/enumerations/remittance-type.model';

import { IRemittanceFlag, NewRemittanceFlag } from './remittance-flag.model';

export const sampleWithRequiredData: IRemittanceFlag = {
  id: 83038,
  remittanceTypeFlag: RemittanceTypeFlag['RMTIN'],
  remittanceType: RemittanceType['INFLOWS'],
};

export const sampleWithPartialData: IRemittanceFlag = {
  id: 5843,
  remittanceTypeFlag: RemittanceTypeFlag['RMTOUT'],
  remittanceType: RemittanceType['OUTFLOWS'],
};

export const sampleWithFullData: IRemittanceFlag = {
  id: 19516,
  remittanceTypeFlag: RemittanceTypeFlag['RMTIN'],
  remittanceType: RemittanceType['INFLOWS'],
  remittanceTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewRemittanceFlag = {
  remittanceTypeFlag: RemittanceTypeFlag['RMTOUT'],
  remittanceType: RemittanceType['OUTFLOWS'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
