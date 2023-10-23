import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { FxReceiptPurposeTypeComponent } from '../list/fx-receipt-purpose-type.component';
import { FxReceiptPurposeTypeDetailComponent } from '../detail/fx-receipt-purpose-type-detail.component';
import { FxReceiptPurposeTypeUpdateComponent } from '../update/fx-receipt-purpose-type-update.component';
import { FxReceiptPurposeTypeRoutingResolveService } from './fx-receipt-purpose-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const fxReceiptPurposeTypeRoute: Routes = [
  {
    path: '',
    component: FxReceiptPurposeTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: FxReceiptPurposeTypeDetailComponent,
    resolve: {
      fxReceiptPurposeType: FxReceiptPurposeTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: FxReceiptPurposeTypeUpdateComponent,
    resolve: {
      fxReceiptPurposeType: FxReceiptPurposeTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: FxReceiptPurposeTypeUpdateComponent,
    resolve: {
      fxReceiptPurposeType: FxReceiptPurposeTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(fxReceiptPurposeTypeRoute)],
  exports: [RouterModule],
})
export class FxReceiptPurposeTypeRoutingModule {}
