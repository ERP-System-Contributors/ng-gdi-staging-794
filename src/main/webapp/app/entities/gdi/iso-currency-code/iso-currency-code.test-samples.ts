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

import { IIsoCurrencyCode, NewIsoCurrencyCode } from './iso-currency-code.model';

export const sampleWithRequiredData: IIsoCurrencyCode = {
  id: 41449,
  alphabeticCode: 'navigate Arizona bypassing',
  numericCode: 'Nebraska Realigned bus',
  minorUnit: 'gold Nebraska',
  currency: 'out-of-the-box Borders Direct',
};

export const sampleWithPartialData: IIsoCurrencyCode = {
  id: 764,
  alphabeticCode: 'Electronics',
  numericCode: 'Rustic',
  minorUnit: 'tertiary JBOD JSON',
  currency: '(customarily',
  country: 'Wallis and Futuna',
};

export const sampleWithFullData: IIsoCurrencyCode = {
  id: 18481,
  alphabeticCode: 'deposit frame Direct',
  numericCode: 'disintermediate synthesize',
  minorUnit: 'grow compelling Tennessee',
  currency: 'object-oriented Frozen Principal',
  country: 'Norway',
};

export const sampleWithNewData: NewIsoCurrencyCode = {
  alphabeticCode: 'matrix',
  numericCode: 'Dollar zero',
  minorUnit: 'Plastic Electronics',
  currency: 'Hat National',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
