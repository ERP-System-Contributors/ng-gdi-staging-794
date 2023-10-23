import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEmploymentTerms } from '../employment-terms.model';
import { EmploymentTermsService } from '../service/employment-terms.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './employment-terms-delete-dialog.component.html',
})
export class EmploymentTermsDeleteDialogComponent {
  employmentTerms?: IEmploymentTerms;

  constructor(protected employmentTermsService: EmploymentTermsService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employmentTermsService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
