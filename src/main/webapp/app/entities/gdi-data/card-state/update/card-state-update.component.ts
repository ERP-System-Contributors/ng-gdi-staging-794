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

import { CardStateFormService, CardStateFormGroup } from './card-state-form.service';
import { ICardState } from '../card-state.model';
import { CardStateService } from '../service/card-state.service';
import { CardStateFlagTypes } from 'app/entities/enumerations/card-state-flag-types.model';

@Component({
  selector: 'jhi-card-state-update',
  templateUrl: './card-state-update.component.html',
})
export class CardStateUpdateComponent implements OnInit {
  isSaving = false;
  cardState: ICardState | null = null;
  cardStateFlagTypesValues = Object.keys(CardStateFlagTypes);

  editForm: CardStateFormGroup = this.cardStateFormService.createCardStateFormGroup();

  constructor(
    protected cardStateService: CardStateService,
    protected cardStateFormService: CardStateFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardState }) => {
      this.cardState = cardState;
      if (cardState) {
        this.updateForm(cardState);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardState = this.cardStateFormService.getCardState(this.editForm);
    if (cardState.id !== null) {
      this.subscribeToSaveResponse(this.cardStateService.update(cardState));
    } else {
      this.subscribeToSaveResponse(this.cardStateService.create(cardState));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardState>>): void {
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

  protected updateForm(cardState: ICardState): void {
    this.cardState = cardState;
    this.cardStateFormService.resetForm(this.editForm, cardState);
  }
}
