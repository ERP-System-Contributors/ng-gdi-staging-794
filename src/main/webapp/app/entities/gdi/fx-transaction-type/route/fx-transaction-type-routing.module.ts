import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FxTransactionTypeComponent } from '../list/fx-transaction-type.component';
import { FxTransactionTypeDetailComponent } from '../detail/fx-transaction-type-detail.component';
import { FxTransactionTypeUpdateComponent } from '../update/fx-transaction-type-update.component';
import { FxTransactionTypeRoutingResolveService } from './fx-transaction-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fxTransactionTypeRoute: Routes = [
  {
    path: '',
    component: FxTransactionTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FxTransactionTypeDetailComponent,
    resolve: {
      fxTransactionType: FxTransactionTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FxTransactionTypeUpdateComponent,
    resolve: {
      fxTransactionType: FxTransactionTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FxTransactionTypeUpdateComponent,
    resolve: {
      fxTransactionType: FxTransactionTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fxTransactionTypeRoute)],
  exports: [RouterModule],
})
export class FxTransactionTypeRoutingModule {}
