import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IChannelType } from '../channel-type.model';
import { ChannelTypeService } from '../service/channel-type.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './channel-type-delete-dialog.component.html',
})
export class ChannelTypeDeleteDialogComponent {
  channelType?: IChannelType;

  constructor(protected channelTypeService: ChannelTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.channelTypeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
