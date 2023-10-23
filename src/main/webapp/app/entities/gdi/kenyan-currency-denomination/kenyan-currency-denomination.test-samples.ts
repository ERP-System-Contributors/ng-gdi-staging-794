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

import { IKenyanCurrencyDenomination, NewKenyanCurrencyDenomination } from './kenyan-currency-denomination.model';

export const sampleWithRequiredData: IKenyanCurrencyDenomination = {
  id: 4589,
  currencyDenominationCode: 'Saudi wireless',
  currencyDenominationType: 'Designer Delaware',
};

export const sampleWithPartialData: IKenyanCurrencyDenomination = {
  id: 64021,
  currencyDenominationCode: 'Guilder Central ADP',
  currencyDenominationType: 'Handmade Factors synthesizing',
};

export const sampleWithFullData: IKenyanCurrencyDenomination = {
  id: 30517,
  currencyDenominationCode: 'Assistant',
  currencyDenominationType: 'cross-media navigating port',
  currencyDenominationTypeDetails: 'Cliff Uganda',
};

export const sampleWithNewData: NewKenyanCurrencyDenomination = {
  currencyDenominationCode: 'cross-platform Salvador deposit',
  currencyDenominationType: 'Berkshire context-sensitive',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
