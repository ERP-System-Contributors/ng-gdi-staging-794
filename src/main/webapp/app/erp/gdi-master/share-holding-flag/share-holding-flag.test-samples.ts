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

import { ShareholdingFlagTypes } from 'app/entities/enumerations/shareholding-flag-types.model';

import { IShareHoldingFlag, NewShareHoldingFlag } from './share-holding-flag.model';

export const sampleWithRequiredData: IShareHoldingFlag = {
  id: 38208,
  shareholdingFlagTypeCode: ShareholdingFlagTypes['Y'],
  shareholdingFlagType: 'Fully-configurable 24/365 of',
};

export const sampleWithPartialData: IShareHoldingFlag = {
  id: 35638,
  shareholdingFlagTypeCode: ShareholdingFlagTypes['N'],
  shareholdingFlagType: 'Vatu Refined Soft',
};

export const sampleWithFullData: IShareHoldingFlag = {
  id: 19184,
  shareholdingFlagTypeCode: ShareholdingFlagTypes['Y'],
  shareholdingFlagType: 'Rwanda Burundi Investor',
  shareholdingTypeDescription: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewShareHoldingFlag = {
  shareholdingFlagTypeCode: ShareholdingFlagTypes['Y'],
  shareholdingFlagType: 'Soap back-end exuding',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
