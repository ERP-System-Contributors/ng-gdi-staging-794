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

import { IAcquiringIssuingFlag, NewAcquiringIssuingFlag } from './acquiring-issuing-flag.model';

export const sampleWithRequiredData: IAcquiringIssuingFlag = {
  id: 75107,
  cardAcquiringIssuingFlagCode: 'Buckinghamshire quantify Concrete',
  cardAcquiringIssuingDescription: 'GB implement connect',
};

export const sampleWithPartialData: IAcquiringIssuingFlag = {
  id: 60909,
  cardAcquiringIssuingFlagCode: 'Metal Future Communications',
  cardAcquiringIssuingDescription: 'infomediaries Account Avon',
  cardAcquiringIssuingDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: IAcquiringIssuingFlag = {
  id: 29708,
  cardAcquiringIssuingFlagCode: 'facilitate Dollar) Gloves',
  cardAcquiringIssuingDescription: 'Wooden aggregate purple',
  cardAcquiringIssuingDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewAcquiringIssuingFlag = {
  cardAcquiringIssuingFlagCode: 'web-enabled back-end',
  cardAcquiringIssuingDescription: 'reintermediate infrastructure navigating',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
