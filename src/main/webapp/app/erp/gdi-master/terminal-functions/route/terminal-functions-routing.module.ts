///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
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
import { TerminalFunctionsComponent } from '../list/terminal-functions.component';
import { TerminalFunctionsDetailComponent } from '../detail/terminal-functions-detail.component';
import { TerminalFunctionsUpdateComponent } from '../update/terminal-functions-update.component';
import { TerminalFunctionsRoutingResolveService } from './terminal-functions-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const terminalFunctionsRoute: Routes = [
  {
    path: '',
    component: TerminalFunctionsComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TerminalFunctionsDetailComponent,
    resolve: {
      terminalFunctions: TerminalFunctionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TerminalFunctionsUpdateComponent,
    resolve: {
      terminalFunctions: TerminalFunctionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TerminalFunctionsUpdateComponent,
    resolve: {
      terminalFunctions: TerminalFunctionsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(terminalFunctionsRoute)],
  exports: [RouterModule],
})
export class TerminalFunctionsRoutingModule {}
