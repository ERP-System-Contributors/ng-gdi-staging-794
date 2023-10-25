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
import { CrbAgingBandsComponent } from './list/crb-aging-bands.component';
import { CrbAgingBandsDetailComponent } from './detail/crb-aging-bands-detail.component';
import { CrbAgingBandsUpdateComponent } from './update/crb-aging-bands-update.component';
import { CrbAgingBandsDeleteDialogComponent } from './delete/crb-aging-bands-delete-dialog.component';
import { CrbAgingBandsRoutingModule } from './route/crb-aging-bands-routing.module';

@NgModule({
  imports: [SharedModule, CrbAgingBandsRoutingModule],
  declarations: [CrbAgingBandsComponent, CrbAgingBandsDetailComponent, CrbAgingBandsUpdateComponent, CrbAgingBandsDeleteDialogComponent],
})
export class CrbAgingBandsModule {}
