import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GenderTypeComponent } from '../list/gender-type.component';
import { GenderTypeDetailComponent } from '../detail/gender-type-detail.component';
import { GenderTypeUpdateComponent } from '../update/gender-type-update.component';
import { GenderTypeRoutingResolveService } from './gender-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const genderTypeRoute: Routes = [
  {
    path: '',
    component: GenderTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenderTypeDetailComponent,
    resolve: {
      genderType: GenderTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenderTypeUpdateComponent,
    resolve: {
      genderType: GenderTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenderTypeUpdateComponent,
    resolve: {
      genderType: GenderTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(genderTypeRoute)],
  exports: [RouterModule],
})
export class GenderTypeRoutingModule {}
