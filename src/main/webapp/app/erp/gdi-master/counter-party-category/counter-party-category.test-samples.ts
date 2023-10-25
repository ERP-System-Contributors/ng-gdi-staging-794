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

import { CounterpartyCategory } from 'app/entities/enumerations/counterparty-category.model';

import { ICounterPartyCategory, NewCounterPartyCategory } from './counter-party-category.model';

export const sampleWithRequiredData: ICounterPartyCategory = {
  id: 48227,
  counterpartyCategoryCode: 'Sports Games Causeway',
  counterpartyCategoryCodeDetails: CounterpartyCategory['LOCAL'],
};

export const sampleWithPartialData: ICounterPartyCategory = {
  id: 9131,
  counterpartyCategoryCode: 'Health',
  counterpartyCategoryCodeDetails: CounterpartyCategory['LOCAL'],
};

export const sampleWithFullData: ICounterPartyCategory = {
  id: 77999,
  counterpartyCategoryCode: 'SSL Buckinghamshire',
  counterpartyCategoryCodeDetails: CounterpartyCategory['LOCAL'],
  counterpartyCategoryDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCounterPartyCategory = {
  counterpartyCategoryCode: 'green Account',
  counterpartyCategoryCodeDetails: CounterpartyCategory['FOREIGN'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
