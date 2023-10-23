import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUltimateBeneficiaryTypes } from '../ultimate-beneficiary-types.model';
import { UltimateBeneficiaryTypesService } from '../service/ultimate-beneficiary-types.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ultimate-beneficiary-types-delete-dialog.component.html',
})
export class UltimateBeneficiaryTypesDeleteDialogComponent {
  ultimateBeneficiaryTypes?: IUltimateBeneficiaryTypes;

  constructor(protected ultimateBeneficiaryTypesService: UltimateBeneficiaryTypesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ultimateBeneficiaryTypesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
