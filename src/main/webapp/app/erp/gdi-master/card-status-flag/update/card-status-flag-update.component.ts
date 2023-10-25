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

import { CardStatusFlagFormService, CardStatusFlagFormGroup } from './card-status-flag-form.service';
import { ICardStatusFlag } from '../card-status-flag.model';
import { CardStatusFlagService } from '../service/card-status-flag.service';
import { FlagCodes } from 'app/entities/enumerations/flag-codes.model';

@Component({
  selector: 'jhi-card-status-flag-update',
  templateUrl: './card-status-flag-update.component.html',
})
export class CardStatusFlagUpdateComponent implements OnInit {
  isSaving = false;
  cardStatusFlag: ICardStatusFlag | null = null;
  flagCodesValues = Object.keys(FlagCodes);

  editForm: CardStatusFlagFormGroup = this.cardStatusFlagFormService.createCardStatusFlagFormGroup();

  constructor(
    protected cardStatusFlagService: CardStatusFlagService,
    protected cardStatusFlagFormService: CardStatusFlagFormService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cardStatusFlag }) => {
      this.cardStatusFlag = cardStatusFlag;
      if (cardStatusFlag) {
        this.updateForm(cardStatusFlag);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cardStatusFlag = this.cardStatusFlagFormService.getCardStatusFlag(this.editForm);
    if (cardStatusFlag.id !== null) {
      this.subscribeToSaveResponse(this.cardStatusFlagService.update(cardStatusFlag));
    } else {
      this.subscribeToSaveResponse(this.cardStatusFlagService.create(cardStatusFlag));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICardStatusFlag>>): void {
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

  protected updateForm(cardStatusFlag: ICardStatusFlag): void {
    this.cardStatusFlag = cardStatusFlag;
    this.cardStatusFlagFormService.resetForm(this.editForm, cardStatusFlag);
  }
}
