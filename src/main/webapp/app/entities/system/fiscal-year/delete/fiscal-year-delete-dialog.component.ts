import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IFiscalYear } from '../fiscal-year.model';
import { FiscalYearService } from '../service/fiscal-year.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './fiscal-year-delete-dialog.component.html',
})
export class FiscalYearDeleteDialogComponent {
  fiscalYear?: IFiscalYear;

  constructor(protected fiscalYearService: FiscalYearService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fiscalYearService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
