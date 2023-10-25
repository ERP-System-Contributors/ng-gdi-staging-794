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
import { TerminalFunctionsComponent } from './list/terminal-functions.component';
import { TerminalFunctionsDetailComponent } from './detail/terminal-functions-detail.component';
import { TerminalFunctionsUpdateComponent } from './update/terminal-functions-update.component';
import { TerminalFunctionsDeleteDialogComponent } from './delete/terminal-functions-delete-dialog.component';
import { TerminalFunctionsRoutingModule } from './route/terminal-functions-routing.module';

@NgModule({
  imports: [SharedModule, TerminalFunctionsRoutingModule],
  declarations: [
    TerminalFunctionsComponent,
    TerminalFunctionsDetailComponent,
    TerminalFunctionsUpdateComponent,
    TerminalFunctionsDeleteDialogComponent,
  ],
})
export class TerminalFunctionsModule {}
