import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAcademicQualification } from '../academic-qualification.model';
import { AcademicQualificationService } from '../service/academic-qualification.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './academic-qualification-delete-dialog.component.html',
})
export class AcademicQualificationDeleteDialogComponent {
  academicQualification?: IAcademicQualification;

  constructor(protected academicQualificationService: AcademicQualificationService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.academicQualificationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
