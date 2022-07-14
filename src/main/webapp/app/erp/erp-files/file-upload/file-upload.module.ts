///
/// Erp System - Mark II No 19 (Baruch Series)
/// Copyright © 2021 - 2022 Edwin Njeru (mailnjeru@gmail.com)
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
import { FileUploadComponent } from './list/file-upload.component';
import { FileUploadDetailComponent } from './detail/file-upload-detail.component';
import { FileUploadUpdateComponent } from './update/file-upload-update.component';
import { FileUploadDeleteDialogComponent } from './delete/file-upload-delete-dialog.component';
import { FileUploadRoutingModule } from './route/file-upload-routing.module';

@NgModule({
  imports: [SharedModule, FileUploadRoutingModule],
  declarations: [FileUploadComponent, FileUploadDetailComponent, FileUploadUpdateComponent, FileUploadDeleteDialogComponent],
  entryComponents: [FileUploadDeleteDialogComponent],
})
export class ErpServiceFileUploadModule {}
