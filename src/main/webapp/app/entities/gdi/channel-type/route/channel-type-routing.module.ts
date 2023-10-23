import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ChannelTypeComponent } from '../list/channel-type.component';
import { ChannelTypeDetailComponent } from '../detail/channel-type-detail.component';
import { ChannelTypeUpdateComponent } from '../update/channel-type-update.component';
import { ChannelTypeRoutingResolveService } from './channel-type-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const channelTypeRoute: Routes = [
  {
    path: '',
    component: ChannelTypeComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ChannelTypeDetailComponent,
    resolve: {
      channelType: ChannelTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ChannelTypeUpdateComponent,
    resolve: {
      channelType: ChannelTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ChannelTypeUpdateComponent,
    resolve: {
      channelType: ChannelTypeRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(channelTypeRoute)],
  exports: [RouterModule],
})
export class ChannelTypeRoutingModule {}
