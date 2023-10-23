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

import { CurrencyServiceabilityFlagTypes } from 'app/entities/enumerations/currency-serviceability-flag-types.model';
import { CurrencyServiceability } from 'app/entities/enumerations/currency-serviceability.model';

import { ICurrencyServiceabilityFlag, NewCurrencyServiceabilityFlag } from './currency-serviceability-flag.model';

export const sampleWithRequiredData: ICurrencyServiceabilityFlag = {
  id: 37670,
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['N'],
  currencyServiceability: CurrencyServiceability['FIT'],
};

export const sampleWithPartialData: ICurrencyServiceabilityFlag = {
  id: 83734,
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['N'],
  currencyServiceability: CurrencyServiceability['FIT'],
  currencyServiceabilityFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICurrencyServiceabilityFlag = {
  id: 54757,
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['Y'],
  currencyServiceability: CurrencyServiceability['UNFIT'],
  currencyServiceabilityFlagDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCurrencyServiceabilityFlag = {
  currencyServiceabilityFlag: CurrencyServiceabilityFlagTypes['Y'],
  currencyServiceability: CurrencyServiceability['UNFIT'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
