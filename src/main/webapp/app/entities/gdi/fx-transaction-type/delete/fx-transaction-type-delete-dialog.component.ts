import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFxTransactionType } from '../fx-transaction-type.model';
import { FxTransactionTypeService } from '../service/fx-transaction-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './fx-transaction-type-delete-dialog.component.html',
})
export class FxTransactionTypeDeleteDialogComponent {
  fxTransactionType?: IFxTransactionType;

  constructor(protected fxTransactionTypeService: FxTransactionTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fxTransactionTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
