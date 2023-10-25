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
import { CrbAccountStatusComponent } from './list/crb-account-status.component';
import { CrbAccountStatusDetailComponent } from './detail/crb-account-status-detail.component';
import { CrbAccountStatusUpdateComponent } from './update/crb-account-status-update.component';
import { CrbAccountStatusDeleteDialogComponent } from './delete/crb-account-status-delete-dialog.component';
import { CrbAccountStatusRoutingModule } from './route/crb-account-status-routing.module';

@NgModule({
  imports: [SharedModule, CrbAccountStatusRoutingModule],
  declarations: [
    CrbAccountStatusComponent,
    CrbAccountStatusDetailComponent,
    CrbAccountStatusUpdateComponent,
    CrbAccountStatusDeleteDialogComponent,
  ],
})
export class CrbAccountStatusModule {}
