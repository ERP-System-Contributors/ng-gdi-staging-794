import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICardCharges } from '../card-charges.model';
import { CardChargesService } from '../service/card-charges.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './card-charges-delete-dialog.component.html',
})
export class CardChargesDeleteDialogComponent {
  cardCharges?: ICardCharges;

  constructor(protected cardChargesService: CardChargesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardChargesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
