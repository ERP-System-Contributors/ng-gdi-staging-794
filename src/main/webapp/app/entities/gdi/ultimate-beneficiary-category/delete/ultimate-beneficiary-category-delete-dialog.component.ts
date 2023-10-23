import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IUltimateBeneficiaryCategory } from '../ultimate-beneficiary-category.model';
import { UltimateBeneficiaryCategoryService } from '../service/ultimate-beneficiary-category.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './ultimate-beneficiary-category-delete-dialog.component.html',
})
export class UltimateBeneficiaryCategoryDeleteDialogComponent {
  ultimateBeneficiaryCategory?: IUltimateBeneficiaryCategory;

  constructor(protected ultimateBeneficiaryCategoryService: UltimateBeneficiaryCategoryService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ultimateBeneficiaryCategoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
