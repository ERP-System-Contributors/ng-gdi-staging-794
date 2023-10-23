import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IKenyanCurrencyDenomination } from '../kenyan-currency-denomination.model';
import { KenyanCurrencyDenominationService } from '../service/kenyan-currency-denomination.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './kenyan-currency-denomination-delete-dialog.component.html',
})
export class KenyanCurrencyDenominationDeleteDialogComponent {
  kenyanCurrencyDenomination?: IKenyanCurrencyDenomination;

  constructor(protected kenyanCurrencyDenominationService: KenyanCurrencyDenominationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.kenyanCurrencyDenominationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
