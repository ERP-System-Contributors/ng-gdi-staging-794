import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICreditCardOwnership } from '../credit-card-ownership.model';
import { CreditCardOwnershipService } from '../service/credit-card-ownership.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './credit-card-ownership-delete-dialog.component.html',
})
export class CreditCardOwnershipDeleteDialogComponent {
  creditCardOwnership?: ICreditCardOwnership;

  constructor(protected creditCardOwnershipService: CreditCardOwnershipService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.creditCardOwnershipService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
