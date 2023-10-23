import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IProfessionalQualification } from '../professional-qualification.model';
import { ProfessionalQualificationService } from '../service/professional-qualification.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './professional-qualification-delete-dialog.component.html',
})
export class ProfessionalQualificationDeleteDialogComponent {
  professionalQualification?: IProfessionalQualification;

  constructor(protected professionalQualificationService: ProfessionalQualificationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.professionalQualificationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
