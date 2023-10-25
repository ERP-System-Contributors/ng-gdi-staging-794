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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AccountOwnershipTypeComponent } from '../list/account-ownership-type.component';
import { AccountOwnershipTypeDetailComponent } from '../detail/account-ownership-type-detail.component';
import { AccountOwnershipTypeRoutingResolveService } from './account-ownership-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const accountOwnershipTypeRoute: Routes = [
  {
    path: '',
    component: AccountOwnershipTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountOwnershipTypeDetailComponent,
    resolve: {
      accountOwnershipType: AccountOwnershipTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountOwnershipTypeRoute)],
  exports: [RouterModule],
})
export class AccountOwnershipTypeRoutingModule {}