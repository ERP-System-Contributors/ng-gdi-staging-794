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

import { ICrbCustomerType, NewCrbCustomerType } from './crb-customer-type.model';

export const sampleWithRequiredData: ICrbCustomerType = {
  id: 7710,
  customerTypeCode: 'Table Portugal',
  customerType: 'fault-tolerant invoice',
};

export const sampleWithPartialData: ICrbCustomerType = {
  id: 68639,
  customerTypeCode: 'Exclusive Radial Auto',
  customerType: 'customized Officer primary',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbCustomerType = {
  id: 5320,
  customerTypeCode: 'vertical Tactics paradigms',
  customerType: 'Bedfordshire',
  description: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbCustomerType = {
  customerTypeCode: 'evolve Synergized',
  customerType: 'EXE Nebraska Credit',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
