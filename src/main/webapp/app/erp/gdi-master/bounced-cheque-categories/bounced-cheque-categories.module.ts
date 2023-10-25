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
import { BouncedChequeCategoriesComponent } from './list/bounced-cheque-categories.component';
import { BouncedChequeCategoriesDetailComponent } from './detail/bounced-cheque-categories-detail.component';
import { BouncedChequeCategoriesUpdateComponent } from './update/bounced-cheque-categories-update.component';
import { BouncedChequeCategoriesDeleteDialogComponent } from './delete/bounced-cheque-categories-delete-dialog.component';
import { BouncedChequeCategoriesRoutingModule } from './route/bounced-cheque-categories-routing.module';

@NgModule({
  imports: [SharedModule, BouncedChequeCategoriesRoutingModule],
  declarations: [
    BouncedChequeCategoriesComponent,
    BouncedChequeCategoriesDetailComponent,
    BouncedChequeCategoriesUpdateComponent,
    BouncedChequeCategoriesDeleteDialogComponent,
  ],
})
export class BouncedChequeCategoriesModule {}