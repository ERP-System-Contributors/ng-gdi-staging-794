import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISourceRemittancePurposeType } from '../source-remittance-purpose-type.model';
import { SourceRemittancePurposeTypeService } from '../service/source-remittance-purpose-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './source-remittance-purpose-type-delete-dialog.component.html',
})
export class SourceRemittancePurposeTypeDeleteDialogComponent {
  sourceRemittancePurposeType?: ISourceRemittancePurposeType;

  constructor(protected sourceRemittancePurposeTypeService: SourceRemittancePurposeTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sourceRemittancePurposeTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
