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

import { ISecurityType, NewSecurityType } from './security-type.model';

export const sampleWithRequiredData: ISecurityType = {
  id: 24614,
  securityTypeCode: 'Unbranded',
  securityType: 'Handmade invoice',
};

export const sampleWithPartialData: ISecurityType = {
  id: 34780,
  securityTypeCode: 'Branding e-business',
  securityType: 'motivating Auto visionary',
};

export const sampleWithFullData: ISecurityType = {
  id: 40984,
  securityTypeCode: 'Carolina generate Vanuatu',
  securityType: 'Spain User-centric',
  securityTypeDetails: '../fake-data/blob/hipster.txt',
  securityTypeDescription: 'fuchsia Rustic Credit',
};

export const sampleWithNewData: NewSecurityType = {
  securityTypeCode: 'green Intelligent',
  securityType: 'Palladium Refined calculating',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
