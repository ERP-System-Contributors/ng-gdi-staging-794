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
import { DealerComponent } from './list/dealer.component';
import { DealerDetailComponent } from './detail/dealer-detail.component';
import { DealerUpdateComponent } from './update/dealer-update.component';
import { DealerDeleteDialogComponent } from './delete/dealer-delete-dialog.component';
import { DealerRoutingModule } from './route/dealer-routing.module';

@NgModule({
  imports: [SharedModule, DealerRoutingModule],
  declarations: [DealerComponent, DealerDetailComponent, DealerUpdateComponent, DealerDeleteDialogComponent],
})
export class ErpServiceDealerModule {}
