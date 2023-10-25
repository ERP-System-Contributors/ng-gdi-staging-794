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
import { CreditCardFacilityComponent } from '../list/credit-card-facility.component';
import { CreditCardFacilityDetailComponent } from '../detail/credit-card-facility-detail.component';
import { CreditCardFacilityUpdateComponent } from '../update/credit-card-facility-update.component';
import { CreditCardFacilityRoutingResolveService } from './credit-card-facility-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const creditCardFacilityRoute: Routes = [
  {
    path: '',
    component: CreditCardFacilityComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CreditCardFacilityDetailComponent,
    resolve: {
      creditCardFacility: CreditCardFacilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CreditCardFacilityUpdateComponent,
    resolve: {
      creditCardFacility: CreditCardFacilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CreditCardFacilityUpdateComponent,
    resolve: {
      creditCardFacility: CreditCardFacilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(creditCardFacilityRoute)],
  exports: [RouterModule],
})
export class CreditCardFacilityRoutingModule {}
