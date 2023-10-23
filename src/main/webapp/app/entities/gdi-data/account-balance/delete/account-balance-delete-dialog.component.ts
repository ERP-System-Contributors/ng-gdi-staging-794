import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAccountBalance } from '../account-balance.model';
import { AccountBalanceService } from '../service/account-balance.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './account-balance-delete-dialog.component.html',
})
export class AccountBalanceDeleteDialogComponent {
  accountBalance?: IAccountBalance;

  constructor(protected accountBalanceService: AccountBalanceService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.accountBalanceService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
