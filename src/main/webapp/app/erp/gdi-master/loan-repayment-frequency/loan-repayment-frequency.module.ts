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
import { LoanRepaymentFrequencyComponent } from './list/loan-repayment-frequency.component';
import { LoanRepaymentFrequencyDetailComponent } from './detail/loan-repayment-frequency-detail.component';
import { LoanRepaymentFrequencyUpdateComponent } from './update/loan-repayment-frequency-update.component';
import { LoanRepaymentFrequencyDeleteDialogComponent } from './delete/loan-repayment-frequency-delete-dialog.component';
import { LoanRepaymentFrequencyRoutingModule } from './route/loan-repayment-frequency-routing.module';

@NgModule({
  imports: [SharedModule, LoanRepaymentFrequencyRoutingModule],
  declarations: [
    LoanRepaymentFrequencyComponent,
    LoanRepaymentFrequencyDetailComponent,
    LoanRepaymentFrequencyUpdateComponent,
    LoanRepaymentFrequencyDeleteDialogComponent,
  ],
})
export class LoanRepaymentFrequencyModule {}
