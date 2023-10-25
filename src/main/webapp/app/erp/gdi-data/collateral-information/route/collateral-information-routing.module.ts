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
import { CollateralInformationComponent } from '../list/collateral-information.component';
import { CollateralInformationDetailComponent } from '../detail/collateral-information-detail.component';
import { CollateralInformationUpdateComponent } from '../update/collateral-information-update.component';
import { CollateralInformationRoutingResolveService } from './collateral-information-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const collateralInformationRoute: Routes = [
  {
    path: '',
    component: CollateralInformationComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CollateralInformationDetailComponent,
    resolve: {
      collateralInformation: CollateralInformationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CollateralInformationUpdateComponent,
    resolve: {
      collateralInformation: CollateralInformationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CollateralInformationUpdateComponent,
    resolve: {
      collateralInformation: CollateralInformationRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(collateralInformationRoute)],
  exports: [RouterModule],
})
export class CollateralInformationRoutingModule {}
