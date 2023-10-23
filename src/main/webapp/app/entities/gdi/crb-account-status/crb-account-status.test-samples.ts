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

import { ICrbAccountStatus, NewCrbAccountStatus } from './crb-account-status.model';

export const sampleWithRequiredData: ICrbAccountStatus = {
  id: 56576,
  accountStatusTypeCode: 'Future Borders grow',
  accountStatusType: 'Product 1080p dot-com',
};

export const sampleWithPartialData: ICrbAccountStatus = {
  id: 166,
  accountStatusTypeCode: 'sexy',
  accountStatusType: 'Towels',
  accountStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithFullData: ICrbAccountStatus = {
  id: 95565,
  accountStatusTypeCode: 'world-class',
  accountStatusType: 'initiative paradigms Jamaican',
  accountStatusTypeDetails: '../fake-data/blob/hipster.txt',
};

export const sampleWithNewData: NewCrbAccountStatus = {
  accountStatusTypeCode: 'Missouri withdrawal',
  accountStatusType: 'synergistic syndicate',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
