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
