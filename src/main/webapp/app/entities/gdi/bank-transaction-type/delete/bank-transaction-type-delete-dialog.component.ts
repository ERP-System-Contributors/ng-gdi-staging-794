import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBankTransactionType } from '../bank-transaction-type.model';
import { BankTransactionTypeService } from '../service/bank-transaction-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './bank-transaction-type-delete-dialog.component.html',
})
export class BankTransactionTypeDeleteDialogComponent {
  bankTransactionType?: IBankTransactionType;

  constructor(protected bankTransactionTypeService: BankTransactionTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bankTransactionTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
