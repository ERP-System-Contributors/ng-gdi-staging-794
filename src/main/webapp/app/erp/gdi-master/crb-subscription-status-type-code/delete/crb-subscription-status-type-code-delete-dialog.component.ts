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

import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrbSubscriptionStatusTypeCode } from '../crb-subscription-status-type-code.model';
import { CrbSubscriptionStatusTypeCodeService } from '../service/crb-subscription-status-type-code.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crb-subscription-status-type-code-delete-dialog.component.html',
})
export class CrbSubscriptionStatusTypeCodeDeleteDialogComponent {
  crbSubscriptionStatusTypeCode?: ICrbSubscriptionStatusTypeCode;

  constructor(
    protected crbSubscriptionStatusTypeCodeService: CrbSubscriptionStatusTypeCodeService,
    protected activeModal: NgbActiveModal
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crbSubscriptionStatusTypeCodeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
