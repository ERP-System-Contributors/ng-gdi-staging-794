import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICardFraudInformation } from '../card-fraud-information.model';
import { CardFraudInformationService } from '../service/card-fraud-information.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './card-fraud-information-delete-dialog.component.html',
})
export class CardFraudInformationDeleteDialogComponent {
  cardFraudInformation?: ICardFraudInformation;

  constructor(protected cardFraudInformationService: CardFraudInformationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardFraudInformationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
