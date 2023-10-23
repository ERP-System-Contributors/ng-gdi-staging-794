import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UltimateBeneficiaryTypesComponent } from '../list/ultimate-beneficiary-types.component';
import { UltimateBeneficiaryTypesDetailComponent } from '../detail/ultimate-beneficiary-types-detail.component';
import { UltimateBeneficiaryTypesUpdateComponent } from '../update/ultimate-beneficiary-types-update.component';
import { UltimateBeneficiaryTypesRoutingResolveService } from './ultimate-beneficiary-types-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const ultimateBeneficiaryTypesRoute: Routes = [
  {
    path: '',
    component: UltimateBeneficiaryTypesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UltimateBeneficiaryTypesDetailComponent,
    resolve: {
      ultimateBeneficiaryTypes: UltimateBeneficiaryTypesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UltimateBeneficiaryTypesUpdateComponent,
    resolve: {
      ultimateBeneficiaryTypes: UltimateBeneficiaryTypesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UltimateBeneficiaryTypesUpdateComponent,
    resolve: {
      ultimateBeneficiaryTypes: UltimateBeneficiaryTypesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(ultimateBeneficiaryTypesRoute)],
  exports: [RouterModule],
})
export class UltimateBeneficiaryTypesRoutingModule {}
