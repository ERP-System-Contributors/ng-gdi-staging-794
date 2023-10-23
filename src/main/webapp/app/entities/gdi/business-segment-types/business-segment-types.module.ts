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
import { BusinessSegmentTypesComponent } from './list/business-segment-types.component';
import { BusinessSegmentTypesDetailComponent } from './detail/business-segment-types-detail.component';
import { BusinessSegmentTypesUpdateComponent } from './update/business-segment-types-update.component';
import { BusinessSegmentTypesDeleteDialogComponent } from './delete/business-segment-types-delete-dialog.component';
import { BusinessSegmentTypesRoutingModule } from './route/business-segment-types-routing.module';

@NgModule({
  imports: [SharedModule, BusinessSegmentTypesRoutingModule],
  declarations: [
    BusinessSegmentTypesComponent,
    BusinessSegmentTypesDetailComponent,
    BusinessSegmentTypesUpdateComponent,
    BusinessSegmentTypesDeleteDialogComponent,
  ],
})
export class BusinessSegmentTypesModule {}
