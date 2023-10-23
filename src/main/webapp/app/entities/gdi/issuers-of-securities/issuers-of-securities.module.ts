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
import { SharedModule } from 'app/shared/shared.module';
import { IssuersOfSecuritiesComponent } from './list/issuers-of-securities.component';
import { IssuersOfSecuritiesDetailComponent } from './detail/issuers-of-securities-detail.component';
import { IssuersOfSecuritiesUpdateComponent } from './update/issuers-of-securities-update.component';
import { IssuersOfSecuritiesDeleteDialogComponent } from './delete/issuers-of-securities-delete-dialog.component';
import { IssuersOfSecuritiesRoutingModule } from './route/issuers-of-securities-routing.module';

@NgModule({
  imports: [SharedModule, IssuersOfSecuritiesRoutingModule],
  declarations: [
    IssuersOfSecuritiesComponent,
    IssuersOfSecuritiesDetailComponent,
    IssuersOfSecuritiesUpdateComponent,
    IssuersOfSecuritiesDeleteDialogComponent,
  ],
})
export class IssuersOfSecuritiesModule {}
