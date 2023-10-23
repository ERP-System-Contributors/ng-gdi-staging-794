import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IInstitutionStatusType } from '../institution-status-type.model';
import { InstitutionStatusTypeService } from '../service/institution-status-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './institution-status-type-delete-dialog.component.html',
})
export class InstitutionStatusTypeDeleteDialogComponent {
  institutionStatusType?: IInstitutionStatusType;

  constructor(protected institutionStatusTypeService: InstitutionStatusTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.institutionStatusTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
