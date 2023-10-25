///
/// GDI STAGING - Mark VI No 3 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2023 ERP System Contributors (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CardTypesFormService, CardTypesFormGroup } from './card-types-form.service';
import { ICardTypes } from '../card-types.model';
import { CardTypesService } from '../service/card-types.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-card-types-update',
  templateUrl: './card-types-update.component.html',
})
export class CardTypesUpdateComponent implements OnInit {
  isSaving = false;
  cardTypes: ICardTypes | null = null;

  editForm: CardTypesFormGroup = this.cardTypesFormService.createCardTypesFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected cardTypesService: CardTypesService,
    protected cardTypesFormService: CardTypesFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardTypes }) => {
      this.cardTypes = cardTypes;
      if (cardTypes) {
        this.updateForm(cardTypes);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('ngGdiStaging794App.error', { message: err.message })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardTypes = this.cardTypesFormService.getCardTypes(this.editForm);
    if (cardTypes.id !== null) {
      this.subscribeToSaveResponse(this.cardTypesService.update(cardTypes));
    } else {
      this.subscribeToSaveResponse(this.cardTypesService.create(cardTypes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardTypes>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cardTypes: ICardTypes): void {
    this.cardTypes = cardTypes;
    this.cardTypesFormService.resetForm(this.editForm, cardTypes);
  }
}
