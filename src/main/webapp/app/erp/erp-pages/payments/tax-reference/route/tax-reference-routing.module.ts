///
/// Erp System - Mark II No 26 (Baruch Series) Client 0.1.3-SNAPSHOT
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
import { TaxReferenceComponent } from '../list/tax-reference.component';
import { TaxReferenceDetailComponent } from '../detail/tax-reference-detail.component';
import { TaxReferenceUpdateComponent } from '../update/tax-reference-update.component';
import { TaxReferenceRoutingResolveService } from './tax-reference-routing-resolve.service';

const taxReferenceRoute: Routes = [
  {
    path: '',
    component: TaxReferenceComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TaxReferenceDetailComponent,
    resolve: {
      taxReference: TaxReferenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TaxReferenceUpdateComponent,
    resolve: {
      taxReference: TaxReferenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TaxReferenceUpdateComponent,
    resolve: {
      taxReference: TaxReferenceRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(taxReferenceRoute)],
  exports: [RouterModule],
})
export class TaxReferenceRoutingModule {}
