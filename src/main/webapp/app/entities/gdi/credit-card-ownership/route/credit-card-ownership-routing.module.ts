import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CreditCardOwnershipComponent } from '../list/credit-card-ownership.component';
import { CreditCardOwnershipDetailComponent } from '../detail/credit-card-ownership-detail.component';
import { CreditCardOwnershipUpdateComponent } from '../update/credit-card-ownership-update.component';
import { CreditCardOwnershipRoutingResolveService } from './credit-card-ownership-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const creditCardOwnershipRoute: Routes = [
  {
    path: '',
    component: CreditCardOwnershipComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CreditCardOwnershipDetailComponent,
    resolve: {
      creditCardOwnership: CreditCardOwnershipRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CreditCardOwnershipUpdateComponent,
    resolve: {
      creditCardOwnership: CreditCardOwnershipRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CreditCardOwnershipUpdateComponent,
    resolve: {
      creditCardOwnership: CreditCardOwnershipRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(creditCardOwnershipRoute)],
  exports: [RouterModule],
})
export class CreditCardOwnershipRoutingModule {}
