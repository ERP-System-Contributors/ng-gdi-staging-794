///
/// Erp System - Mark II No 26 (Baruch Series) Client 0.1.3-SNAPSHOT
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
import { TransactionAccountComponent } from './list/transaction-account.component';
import { TransactionAccountDetailComponent } from './detail/transaction-account-detail.component';
import { TransactionAccountUpdateComponent } from './update/transaction-account-update.component';
import { TransactionAccountDeleteDialogComponent } from './delete/transaction-account-delete-dialog.component';
import { TransactionAccountRoutingModule } from './route/transaction-account-routing.module';

@NgModule({
  imports: [SharedModule, TransactionAccountRoutingModule],
  declarations: [
    TransactionAccountComponent,
    TransactionAccountDetailComponent,
    TransactionAccountUpdateComponent,
    TransactionAccountDeleteDialogComponent,
  ],
  entryComponents: [TransactionAccountDeleteDialogComponent],
})
export class TransactionAccountModule {}
