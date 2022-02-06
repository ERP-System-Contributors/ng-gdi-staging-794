import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISettlementCurrency } from '../../../erp/erp-common/models/settlement-currency.model';
import { SettlementCurrencyService } from '../../../erp/erp-common/services/settlement-currency.service';

@Component({
  templateUrl: './settlement-currency-delete-dialog.component.html',
})
export class SettlementCurrencyDeleteDialogComponent {
  settlementCurrency?: ISettlementCurrency;

  constructor(protected settlementCurrencyService: SettlementCurrencyService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.settlementCurrencyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
