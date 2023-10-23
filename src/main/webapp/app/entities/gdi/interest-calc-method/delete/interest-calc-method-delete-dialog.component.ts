import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInterestCalcMethod } from '../interest-calc-method.model';
import { InterestCalcMethodService } from '../service/interest-calc-method.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './interest-calc-method-delete-dialog.component.html',
})
export class InterestCalcMethodDeleteDialogComponent {
  interestCalcMethod?: IInterestCalcMethod;

  constructor(protected interestCalcMethodService: InterestCalcMethodService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.interestCalcMethodService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
