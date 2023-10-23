import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IGlMapping } from '../gl-mapping.model';
import { GlMappingService } from '../service/gl-mapping.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './gl-mapping-delete-dialog.component.html',
})
export class GlMappingDeleteDialogComponent {
  glMapping?: IGlMapping;

  constructor(protected glMappingService: GlMappingService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.glMappingService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
