import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { InstitutionContactDetailsComponent } from '../list/institution-contact-details.component';
import { InstitutionContactDetailsDetailComponent } from '../detail/institution-contact-details-detail.component';
import { InstitutionContactDetailsUpdateComponent } from '../update/institution-contact-details-update.component';
import { InstitutionContactDetailsRoutingResolveService } from './institution-contact-details-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const institutionContactDetailsRoute: Routes = [
  {
    path: '',
    component: InstitutionContactDetailsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: InstitutionContactDetailsDetailComponent,
    resolve: {
      institutionContactDetails: InstitutionContactDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: InstitutionContactDetailsUpdateComponent,
    resolve: {
      institutionContactDetails: InstitutionContactDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: InstitutionContactDetailsUpdateComponent,
    resolve: {
      institutionContactDetails: InstitutionContactDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(institutionContactDetailsRoute)],
  exports: [RouterModule],
})
export class InstitutionContactDetailsRoutingModule {}
