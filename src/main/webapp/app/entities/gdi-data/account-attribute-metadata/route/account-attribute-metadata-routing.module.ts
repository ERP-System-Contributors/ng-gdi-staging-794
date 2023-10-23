import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AccountAttributeMetadataComponent } from '../list/account-attribute-metadata.component';
import { AccountAttributeMetadataDetailComponent } from '../detail/account-attribute-metadata-detail.component';
import { AccountAttributeMetadataUpdateComponent } from '../update/account-attribute-metadata-update.component';
import { AccountAttributeMetadataRoutingResolveService } from './account-attribute-metadata-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const accountAttributeMetadataRoute: Routes = [
  {
    path: '',
    component: AccountAttributeMetadataComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AccountAttributeMetadataDetailComponent,
    resolve: {
      accountAttributeMetadata: AccountAttributeMetadataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AccountAttributeMetadataUpdateComponent,
    resolve: {
      accountAttributeMetadata: AccountAttributeMetadataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AccountAttributeMetadataUpdateComponent,
    resolve: {
      accountAttributeMetadata: AccountAttributeMetadataRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountAttributeMetadataRoute)],
  exports: [RouterModule],
})
export class AccountAttributeMetadataRoutingModule {}
