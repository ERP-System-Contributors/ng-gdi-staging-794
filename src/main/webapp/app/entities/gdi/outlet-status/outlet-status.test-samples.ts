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

import { BranchStatusType } from 'app/entities/enumerations/branch-status-type.model';

import { IOutletStatus, NewOutletStatus } from './outlet-status.model';

export const sampleWithRequiredData: IOutletStatus = {
  id: 70322,
  branchStatusTypeCode: 'Up-sized Stand-alone',
  branchStatusType: BranchStatusType['ACTIVE'],
};

export const sampleWithPartialData: IOutletStatus = {
  id: 4116,
  branchStatusTypeCode: 'navigate',
  branchStatusType: BranchStatusType['CLOSED'],
  branchStatusTypeDescription: 'deposit',
};

export const sampleWithFullData: IOutletStatus = {
  id: 91113,
  branchStatusTypeCode: 'Home bricks-and-clicks',
  branchStatusType: BranchStatusType['INACTIVE'],
  branchStatusTypeDescription: 'internet',
};

export const sampleWithNewData: NewOutletStatus = {
  branchStatusTypeCode: 'eyeballs partnerships bluetooth',
  branchStatusType: BranchStatusType[undefined],
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
