import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ISnaSectorCode } from '../sna-sector-code.model';
import { SnaSectorCodeService } from '../service/sna-sector-code.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './sna-sector-code-delete-dialog.component.html',
})
export class SnaSectorCodeDeleteDialogComponent {
  snaSectorCode?: ISnaSectorCode;

  constructor(protected snaSectorCodeService: SnaSectorCodeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.snaSectorCodeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
