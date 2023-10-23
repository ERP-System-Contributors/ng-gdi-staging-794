import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { CardStateComponent } from '../list/card-state.component';
import { CardStateDetailComponent } from '../detail/card-state-detail.component';
import { CardStateUpdateComponent } from '../update/card-state-update.component';
import { CardStateRoutingResolveService } from './card-state-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const cardStateRoute: Routes = [
  {
    path: '',
    component: CardStateComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CardStateDetailComponent,
    resolve: {
      cardState: CardStateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: CardStateUpdateComponent,
    resolve: {
      cardState: CardStateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CardStateUpdateComponent,
    resolve: {
      cardState: CardStateRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(cardStateRoute)],
  exports: [RouterModule],
})
export class CardStateRoutingModule {}
