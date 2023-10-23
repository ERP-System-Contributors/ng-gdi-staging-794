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

import { IDerivativeUnderlyingAsset, NewDerivativeUnderlyingAsset } from './derivative-underlying-asset.model';

export const sampleWithRequiredData: IDerivativeUnderlyingAsset = {
  id: 15167,
  derivativeUnderlyingAssetTypeCode: 'deposit communities Falkland',
  financialDerivativeUnderlyingAssetType: 'Connecticut object-oriented Pula',
};

export const sampleWithPartialData: IDerivativeUnderlyingAsset = {
  id: 93998,
  derivativeUnderlyingAssetTypeCode: 'Plastic Greens Awesome',
  financialDerivativeUnderlyingAssetType: 'brand invoice',
  derivativeUnderlyingAssetTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IDerivativeUnderlyingAsset = {
  id: 16051,
  derivativeUnderlyingAssetTypeCode: 'Handmade B2B',
  financialDerivativeUnderlyingAssetType: 'optimal grid-enabled',
  derivativeUnderlyingAssetTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewDerivativeUnderlyingAsset = {
  derivativeUnderlyingAssetTypeCode: 'Games Down-sized cross-media',
  financialDerivativeUnderlyingAssetType: 'COM',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
