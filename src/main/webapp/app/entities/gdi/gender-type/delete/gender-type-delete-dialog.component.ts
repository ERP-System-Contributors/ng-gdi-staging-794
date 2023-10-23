import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenderType } from '../gender-type.model';
import { GenderTypeService } from '../service/gender-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './gender-type-delete-dialog.component.html',
})
export class GenderTypeDeleteDialogComponent {
  genderType?: IGenderType;

  constructor(protected genderTypeService: GenderTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genderTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
