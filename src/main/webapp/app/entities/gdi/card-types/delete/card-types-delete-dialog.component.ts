import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICardTypes } from '../card-types.model';
import { CardTypesService } from '../service/card-types.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './card-types-delete-dialog.component.html',
})
export class CardTypesDeleteDialogComponent {
  cardTypes?: ICardTypes;

  constructor(protected cardTypesService: CardTypesService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cardTypesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
