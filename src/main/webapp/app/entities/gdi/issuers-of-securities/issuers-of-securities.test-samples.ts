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

import { IIssuersOfSecurities, NewIssuersOfSecurities } from './issuers-of-securities.model';

export const sampleWithRequiredData: IIssuersOfSecurities = {
  id: 20242,
  issuerOfSecuritiesCode: 'primary',
  issuerOfSecurities: 'Handmade hardware',
};

export const sampleWithPartialData: IIssuersOfSecurities = {
  id: 14030,
  issuerOfSecuritiesCode: 'Sports back-end',
  issuerOfSecurities: 'deposit pixel',
};

export const sampleWithFullData: IIssuersOfSecurities = {
  id: 31759,
  issuerOfSecuritiesCode: 'Salad',
  issuerOfSecurities: 'Concrete analyzer',
  issuerOfSecuritiesDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewIssuersOfSecurities = {
  issuerOfSecuritiesCode: 'up lavender invoice',
  issuerOfSecurities: 'Customer-focused',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
