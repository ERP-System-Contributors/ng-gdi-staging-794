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

import { CurrencyAuthenticityFlags } from 'app/entities/enumerations/currency-authenticity-flags.model';
import { CurrencyAuthenticityTypes } from 'app/entities/enumerations/currency-authenticity-types.model';

import { ICurrencyAuthenticityFlag, NewCurrencyAuthenticityFlag } from './currency-authenticity-flag.model';

export const sampleWithRequiredData: ICurrencyAuthenticityFlag = {
  id: 86716,
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['N'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['GENUINE'],
};

export const sampleWithPartialData: ICurrencyAuthenticityFlag = {
  id: 44641,
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['Y'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['GENUINE'],
};

export const sampleWithFullData: ICurrencyAuthenticityFlag = {
  id: 45666,
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['N'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['COUNTERFEIT'],
  currencyAuthenticityTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCurrencyAuthenticityFlag = {
  currencyAuthenticityFlag: CurrencyAuthenticityFlags['Y'],
  currencyAuthenticityType: CurrencyAuthenticityTypes['GENUINE'],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
