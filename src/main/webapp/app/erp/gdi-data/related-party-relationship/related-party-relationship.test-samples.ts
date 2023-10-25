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

import dayjs from 'dayjs/esm';

import { IRelatedPartyRelationship, NewRelatedPartyRelationship } from './related-party-relationship.model';

export const sampleWithRequiredData: IRelatedPartyRelationship = {
  id: 7428,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Avon',
  relatedPartyId: 'plum',
};

export const sampleWithPartialData: IRelatedPartyRelationship = {
  id: 89910,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Track',
  relatedPartyId: 'green Cotton online',
};

export const sampleWithFullData: IRelatedPartyRelationship = {
  id: 72229,
  reportingDate: dayjs('2023-10-03'),
  customerId: 'deliver cyan Chips',
  relatedPartyId: 'York',
};

export const sampleWithNewData: NewRelatedPartyRelationship = {
  reportingDate: dayjs('2023-10-03'),
  customerId: 'Steel Walks',
  relatedPartyId: 'Granite defect',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
