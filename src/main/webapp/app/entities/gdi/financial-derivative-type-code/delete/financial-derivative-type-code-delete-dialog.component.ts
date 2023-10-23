import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFinancialDerivativeTypeCode } from '../financial-derivative-type-code.model';
import { FinancialDerivativeTypeCodeService } from '../service/financial-derivative-type-code.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './financial-derivative-type-code-delete-dialog.component.html',
})
export class FinancialDerivativeTypeCodeDeleteDialogComponent {
  financialDerivativeTypeCode?: IFinancialDerivativeTypeCode;

  constructor(protected financialDerivativeTypeCodeService: FinancialDerivativeTypeCodeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.financialDerivativeTypeCodeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
