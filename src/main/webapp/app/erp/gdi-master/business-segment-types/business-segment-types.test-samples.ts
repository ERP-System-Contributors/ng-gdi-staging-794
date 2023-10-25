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

import { IBusinessSegmentTypes, NewBusinessSegmentTypes } from './business-segment-types.model';

export const sampleWithRequiredData: IBusinessSegmentTypes = {
  id: 77491,
  businessEconomicSegmentCode: 'Bedfordshire',
  businessEconomicSegment: 'Dynamic Computers',
};

export const sampleWithPartialData: IBusinessSegmentTypes = {
  id: 42369,
  businessEconomicSegmentCode: 'Bike Unbranded orchestration',
  businessEconomicSegment: 'Shoes Executive',
};

export const sampleWithFullData: IBusinessSegmentTypes = {
  id: 35515,
  businessEconomicSegmentCode: 'world-class Wall circuit',
  businessEconomicSegment: 'compelling',
  details: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewBusinessSegmentTypes = {
  businessEconomicSegmentCode: 'end-to-end program Metal',
  businessEconomicSegment: 'Intranet Savings',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
