import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAccountAttribute } from '../account-attribute.model';
import { AccountAttributeService } from '../service/account-attribute.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './account-attribute-delete-dialog.component.html',
})
export class AccountAttributeDeleteDialogComponent {
  accountAttribute?: IAccountAttribute;

  constructor(protected accountAttributeService: AccountAttributeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.accountAttributeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
