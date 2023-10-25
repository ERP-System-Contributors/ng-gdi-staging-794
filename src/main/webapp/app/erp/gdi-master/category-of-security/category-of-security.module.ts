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
import { CategoryOfSecurityComponent } from './list/category-of-security.component';
import { CategoryOfSecurityDetailComponent } from './detail/category-of-security-detail.component';
import { CategoryOfSecurityUpdateComponent } from './update/category-of-security-update.component';
import { CategoryOfSecurityDeleteDialogComponent } from './delete/category-of-security-delete-dialog.component';
import { CategoryOfSecurityRoutingModule } from './route/category-of-security-routing.module';

@NgModule({
  imports: [SharedModule, CategoryOfSecurityRoutingModule],
  declarations: [
    CategoryOfSecurityComponent,
    CategoryOfSecurityDetailComponent,
    CategoryOfSecurityUpdateComponent,
    CategoryOfSecurityDeleteDialogComponent,
  ],
})
export class CategoryOfSecurityModule {}