import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICrbAmountCategoryBand } from '../crb-amount-category-band.model';
import { CrbAmountCategoryBandService } from '../service/crb-amount-category-band.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './crb-amount-category-band-delete-dialog.component.html',
})
export class CrbAmountCategoryBandDeleteDialogComponent {
  crbAmountCategoryBand?: ICrbAmountCategoryBand;

  constructor(protected crbAmountCategoryBandService: CrbAmountCategoryBandService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.crbAmountCategoryBandService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
