import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICollateralInformation } from '../collateral-information.model';
import { CollateralInformationService } from '../service/collateral-information.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './collateral-information-delete-dialog.component.html',
})
export class CollateralInformationDeleteDialogComponent {
  collateralInformation?: ICollateralInformation;

  constructor(protected collateralInformationService: CollateralInformationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.collateralInformationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
