import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IStaffRoleType } from '../staff-role-type.model';
import { StaffRoleTypeService } from '../service/staff-role-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './staff-role-type-delete-dialog.component.html',
})
export class StaffRoleTypeDeleteDialogComponent {
  staffRoleType?: IStaffRoleType;

  constructor(protected staffRoleTypeService: StaffRoleTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.staffRoleTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
